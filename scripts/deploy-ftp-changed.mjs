#!/usr/bin/env node
// Incremental FTP upload: walks dist/static, skips CONTENT images (the big,
// stable-named theme sets copied from public/), and only uploads files whose
// content differs from the local backup. Bails out unless the backup directory
// exists, so we always have something to roll back to.
//
// The image skip is by ROLE, not extension: a file is skippable only if its
// relative path exists in public/ (it was copied, not emitted). Everything the
// BUILD emitted — content-hashed names that change every build — always
// uploads regardless of extension. The old extension filter skipped emitted
// .svg flags (br-<hash>.svg & co) and 404'd them in prod: content images
// tolerate being skipped because their names are stable; hashed assets do not.

import { Client } from "basic-ftp";
import { createHash } from "node:crypto";
import { copyFileSync, createReadStream, existsSync, mkdirSync, statSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { dirname, join, posix, relative, resolve, sep } from "node:path";
import { pipeline } from "node:stream/promises";
import process from "node:process";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local", override: true });

const required = ["FTP_HOST", "FTP_USER", "FTP_PASS", "FTP_REMOTE_DIR", "FTP_BACKUP_DIR"];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`[ftp-changed] missing env: ${missing.join(", ")}`);
  console.error(`[ftp-changed] FTP_BACKUP_DIR must point at a populated local mirror — refusing to upload without one`);
  process.exit(1);
}

const host = process.env.FTP_HOST;
const port = Number(process.env.FTP_PORT ?? 21);
const user = process.env.FTP_USER;
const password = process.env.FTP_PASS;
const remoteDir = process.env.FTP_REMOTE_DIR;
const localDir = resolve(process.env.FTP_LOCAL_DIR ?? "dist/static");
const backupDir = resolve(process.env.FTP_BACKUP_DIR);
const secure = (process.env.FTP_SECURE ?? "true").toLowerCase() !== "false";
const dryRun = process.argv.includes("--dry-run");
const verbose = process.argv.includes("--verbose");
const yes = process.argv.includes("--yes") || process.argv.includes("-y");
const withImages = process.argv.includes("--with-images");
const imagesOnly = process.argv.includes("--images-only");
const concurrency = (() => {
  const i = process.argv.indexOf("--concurrency");
  if (i === -1) return 4;
  const n = Number(process.argv[i + 1]);
  return Number.isFinite(n) && n > 0 ? Math.min(n, 16) : 4;
})();

const IMAGE_EXT = new Set([".webp", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico", ".avif"]);
const publicDir = resolve(process.env.FTP_PUBLIC_DIR ?? "public");

/**
 * Role test: a dist file whose relative path exists in public/ was COPIED
 * from there — app content with a stable name. Only these are candidates for
 * the image skip. Anything else was emitted by the build and must upload.
 */
const isPublicContent = (rel) => existsSync(join(publicDir, rel));

if (!existsSync(localDir)) {
  console.error(`[ftp-changed] local dir not found: ${localDir}`);
  console.error(`[ftp-changed] run "npm run build:prod" first`);
  process.exit(1);
}
if (!existsSync(backupDir)) {
  console.error(`[ftp-changed] backup dir not found: ${backupDir}`);
  console.error(`[ftp-changed] run "npm run deploy:ftp:backup" first so we have a rollback point`);
  process.exit(1);
}

console.log(`[ftp-changed] host:    ${host}:${port} (secure=${secure})`);
console.log(`[ftp-changed] user:    ${user}`);
console.log(`[ftp-changed] remote:  ${remoteDir}`);
console.log(`[ftp-changed] local:   ${localDir}`);
console.log(`[ftp-changed] backup:  ${backupDir}`);
console.log(
  `[ftp-changed] content images (public/-copied): ${
    imagesOnly ? "ONLY these" : withImages ? "include" : "skip"
  } (${[...IMAGE_EXT].join(", ")}); build-emitted files always upload`
);
console.log(`[ftp-changed] workers: ${concurrency}`);
if (dryRun) console.log(`[ftp-changed] DRY RUN — no upload`);

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip hidden build-artifact dirs like .vite, but keep recursing through normal dirs.
      if (entry.name.startsWith(".")) continue;
      yield* walk(full);
    } else if (entry.isFile()) {
      yield full;
    }
  }
}

function extOf(name) {
  const i = name.lastIndexOf(".");
  return i === -1 ? "" : name.slice(i).toLowerCase();
}

// Upload-order document pass: files whose markup references hashed assets.
const DOCUMENT_EXT = new Set([".html", ".rsc"]);

async function sha1(file) {
  const hash = createHash("sha1");
  await pipeline(createReadStream(file), hash);
  return hash.digest("hex");
}

function fmtBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

async function buildPlan() {
  const upload = [];
  let skippedImage = 0;
  let skippedNonImage = 0;
  let skippedSame = 0;
  let totalBytes = 0;

  for await (const file of walk(localDir)) {
    const ext = extOf(file);
    const rel = relative(localDir, file);
    // Skippable = image extension AND copied from public/. Build-emitted
    // files (hashed flags, fonts, chunks) never match and always upload.
    const contentImage = IMAGE_EXT.has(ext) && isPublicContent(rel);
    if (imagesOnly && !contentImage) {
      skippedNonImage++;
      continue;
    }
    if (!imagesOnly && !withImages && contentImage) {
      skippedImage++;
      continue;
    }
    const backup = join(backupDir, rel);
    const localSize = statSync(file).size;

    if (existsSync(backup) && statSync(backup).size === localSize) {
      if ((await sha1(file)) === (await sha1(backup))) {
        skippedSame++;
        continue;
      }
    }
    upload.push({ file, rel, size: localSize });
    totalBytes += localSize;
  }

  // Referenced assets land before the documents that reference them: every
  // rebuild rotates content hashes, so a purely alphabetical order overwrites
  // a page's HTML with markup pointing at hashed CSS/JS that is still minutes
  // away over FTP — visitors mid-deploy got unstyled, unhydrated pages. Two
  // passes (assets, then .html/.rsc documents), each alphabetical, keep the
  // order stable and the backup-diff resume property intact.
  const isDocument = (rel) => DOCUMENT_EXT.has(extOf(rel));
  upload.sort(
    (a, b) =>
      (isDocument(a.rel) ? 1 : 0) - (isDocument(b.rel) ? 1 : 0) ||
      a.rel.localeCompare(b.rel)
  );
  return { upload, skippedImage, skippedNonImage, skippedSame, totalBytes };
}

const plan = await buildPlan();
console.log(
  `[ftp-changed] plan: ${plan.upload.length} files to upload (${fmtBytes(plan.totalBytes)}), ` +
    `${plan.skippedSame} unchanged, ${plan.skippedImage} images skipped, ` +
    `${plan.skippedNonImage} non-images skipped`
);

if (verbose || dryRun) {
  for (const item of plan.upload) {
    console.log(`  + ${item.rel}  (${fmtBytes(item.size)})`);
  }
}

if (dryRun || plan.upload.length === 0) {
  process.exit(0);
}

if (!yes) {
  console.log(`[ftp-changed] pass --yes to proceed (or --dry-run to just preview)`);
  process.exit(0);
}

const toRemote = (rel) => posix.join(remoteDir, rel.split(sep).join("/"));

// Mirror each successful upload into the local backup so a re-run after a
// cancel/failure naturally skips already-uploaded files (the buildPlan diff
// will mark them unchanged).
function recordUploaded(item) {
  const dest = join(backupDir, item.rel);
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(item.file, dest);
}

const clients = [];
try {
  for (let i = 0; i < concurrency; i++) {
    const c = new Client(60_000);
    c.ftp.verbose = verbose;
    await c.access({ host, port, user, password, secure });
    clients.push(c);
  }
  console.log(`[ftp-changed] connected ${clients.length} worker(s)`);

  // Per-client ensureDir cache — ensureDir is idempotent server-side, but
  // each client tracks its own state, so cache locally to skip round-trips.
  const ensuredPerClient = clients.map(() => new Set());
  const queue = plan.upload.slice();
  const total = plan.upload.length;
  let done = 0;
  let bytesDone = 0;
  let failure = null;

  async function worker(client, idx) {
    const ensured = ensuredPerClient[idx];
    while (queue.length && !failure) {
      const item = queue.shift();
      if (!item) return;
      const remotePath = toRemote(item.rel);
      const remoteDirOf = posix.dirname(remotePath);
      try {
        if (!ensured.has(remoteDirOf)) {
          await client.ensureDir(remoteDirOf);
          ensured.add(remoteDirOf);
        }
        await client.uploadFrom(item.file, remotePath);
        recordUploaded(item);
        done++;
        bytesDone += item.size;
        console.log(
          `[ftp-changed] (${done}/${total}) [w${idx}] ${item.rel} (${fmtBytes(item.size)})  ` +
            `[${fmtBytes(bytesDone)} / ${fmtBytes(plan.totalBytes)}]`
        );
      } catch (err) {
        failure = err;
        // Push the item back so the eventual re-run sees it as still-needed
        // (we did not record it as uploaded). No further action required.
        return;
      }
    }
  }

  await Promise.all(clients.map((c, i) => worker(c, i)));

  if (failure) throw failure;
  console.log(`[ftp-changed] uploaded ${done} file(s), ${fmtBytes(bytesDone)}`);
} catch (err) {
  console.error(`\n[ftp-changed] failed: ${err.message}`);
  if (err.code) console.error(`[ftp-changed] code: ${err.code}`);
  process.exit(1);
} finally {
  for (const c of clients) c.close();
}

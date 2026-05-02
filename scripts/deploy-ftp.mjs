#!/usr/bin/env node
import { Client } from "basic-ftp";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import process from "node:process";
import "dotenv/config";

const required = ["FTP_HOST", "FTP_USER", "FTP_PASS"];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`[deploy-ftp] missing env: ${missing.join(", ")}`);
  console.error(`[deploy-ftp] copy .env.example to .env and fill in the values`);
  process.exit(1);
}

const host = process.env.FTP_HOST;
const port = Number(process.env.FTP_PORT ?? 21);
const user = process.env.FTP_USER;
const password = process.env.FTP_PASS;
const remoteDir = process.env.FTP_REMOTE_DIR ?? "/www";
const localDir = resolve(process.env.FTP_LOCAL_DIR ?? "dist/static");
const secure = (process.env.FTP_SECURE ?? "true").toLowerCase() !== "false";
const dryRun = process.argv.includes("--dry-run");
const verbose = process.argv.includes("--verbose");

if (!existsSync(localDir)) {
  console.error(`[deploy-ftp] local dir not found: ${localDir}`);
  console.error(`[deploy-ftp] run "npm run build" first`);
  process.exit(1);
}

console.log(`[deploy-ftp] host:        ${host}:${port} (secure=${secure})`);
console.log(`[deploy-ftp] user:        ${user}`);
console.log(`[deploy-ftp] local:       ${localDir}`);
console.log(`[deploy-ftp] remote:      ${remoteDir}`);
if (dryRun) console.log(`[deploy-ftp] DRY RUN — connecting only, no upload`);

const client = new Client(30_000);
client.ftp.verbose = verbose;

try {
  await client.access({ host, port, user, password, secure });
  console.log(`[deploy-ftp] connected`);

  if (dryRun) {
    const list = await client.list();
    console.log(`[deploy-ftp] remote root listing (${list.length} entries):`);
    for (const item of list.slice(0, 20)) {
      console.log(`  ${item.type === 2 ? "d" : "-"} ${item.name}`);
    }
    if (list.length > 20) console.log(`  … (${list.length - 20} more)`);
    process.exit(0);
  }

  await client.ensureDir(remoteDir);
  client.trackProgress((info) => {
    if (info.name) {
      process.stdout.write(`\r[deploy-ftp] ${info.name} (${info.bytesOverall} bytes)        `);
    }
  });

  await client.uploadFromDir(localDir, remoteDir);
  client.trackProgress();
  console.log(`\n[deploy-ftp] done`);
} catch (err) {
  console.error(`\n[deploy-ftp] failed: ${err.message}`);
  if (err.code) console.error(`[deploy-ftp] code: ${err.code}`);
  process.exit(1);
} finally {
  client.close();
}

#!/usr/bin/env node
// Seed FTP_BACKUP_DIR from the local build output (FTP_LOCAL_DIR, default
// dist/static). Run this exactly once after a fresh full upload so the
// incremental deploy has a baseline to diff against.
//
// Subsequent incremental runs mirror each successful upload into the backup
// themselves, so this script only needs to run once per machine.

import { cpSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import process from "node:process";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local", override: true });

const localDir = resolve(process.env.FTP_LOCAL_DIR ?? "dist/static");
const backupDir = process.env.FTP_BACKUP_DIR ? resolve(process.env.FTP_BACKUP_DIR) : null;
const force = process.argv.includes("--force");

if (!backupDir) {
  console.error(`[seed-backup] FTP_BACKUP_DIR is required (set it in .env.local)`);
  process.exit(1);
}
if (!existsSync(localDir)) {
  console.error(`[seed-backup] local dir not found: ${localDir}`);
  console.error(`[seed-backup] run "npm run build:prod" first`);
  process.exit(1);
}
if (existsSync(backupDir) && !force) {
  console.error(`[seed-backup] backup dir already exists: ${backupDir}`);
  console.error(`[seed-backup] pass --force to overwrite, or delete it first`);
  process.exit(1);
}

console.log(`[seed-backup] copying ${localDir} -> ${backupDir}`);
cpSync(localDir, backupDir, { recursive: true });
console.log(`[seed-backup] done`);

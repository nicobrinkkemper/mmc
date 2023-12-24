import fs from "node:fs/promises";
import { folderStat } from "./stat.mjs";

export async function createFolder(src: string) {
  if (await folderStat(src)) return;
  await fs
    .mkdir(src, {
      recursive: true,
    })
    .catch((e) => {
      console.trace(e);
      return undefined;
    });
}

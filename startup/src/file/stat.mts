import fs from "node:fs/promises";
import path from "node:path";
export const fileStat = (src: string) =>
  fs
    .stat(path.resolve(src))
    .then((stat) => stat.isFile())
    .catch(() => false);

export const folderStat = (src: string) =>
  fs
    .stat(path.resolve(src))
    .then((stat) => stat.isDirectory())
    .catch(() => false);

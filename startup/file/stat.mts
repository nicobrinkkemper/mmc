import fs from "node:fs/promises";
import path from "node:path";
export const fileStat = (src: string) =>
  fs
    .stat(path.resolve(src))
    .then((stat) => stat.isFile())
    .catch((e) => {
      console.trace(e);
      return false;
    });

export const folderStat = (src: string) =>
  fs
    .stat(path.resolve(src))
    .then((stat) => stat.isDirectory())
    .catch((e) => {
      console.trace(e);
      return false;
    });

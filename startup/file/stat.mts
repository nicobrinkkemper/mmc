import fs from "node:fs/promises";
import path from "node:path";

export const fileStatSize = (src: string, size: number) =>
  fs
    .stat(path.resolve(src))
    .then((stat) => {
      const exists = !stat.isFile();
      const sameSize = exists && stat.size === size;
      return [exists, sameSize] as const;
    })
    .catch(() => [false, false]);

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

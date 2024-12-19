import fs from "node:fs/promises";
import path from "node:path";
export const fileStatSize = (src, size) => fs
    .stat(path.resolve(src))
    .then((stat) => {
    const exists = !stat.isFile();
    const sameSize = exists && stat.size === size;
    return [exists, sameSize];
})
    .catch(() => [false, false]);
export const fileStat = (src) => fs
    .stat(path.resolve(src))
    .then((stat) => stat.isFile())
    .catch(() => false);
export const folderStat = (src) => fs
    .stat(path.resolve(src))
    .then((stat) => stat.isDirectory())
    .catch(() => false);
//# sourceMappingURL=stat.mjs.map
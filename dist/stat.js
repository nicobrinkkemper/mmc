import fs from "node:fs/promises";
export const fileStat = (src) => fs
    .stat(src)
    .then(({ isFile }) => isFile())
    .catch((e) => {
    console.trace(e);
    return false;
});
export const folderStat = (src) => fs
    .stat(src)
    .then(({ isDirectory }) => isDirectory())
    .catch((e) => {
    console.trace(e);
    return false;
});

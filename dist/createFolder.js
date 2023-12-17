import fs from "node:fs/promises";
import { folderStat } from "./stat";
export async function createFolder(src) {
    if (await folderStat(src))
        return;
    await fs
        .mkdir(src, {
        recursive: true,
    })
        .catch((e) => {
        console.trace(e);
        return undefined;
    });
}

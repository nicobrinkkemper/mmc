import fs from "node:fs/promises";

export async function createFolder(src: string) {
  await fs
    .mkdir(src, {
      recursive: true,
    })
    .catch((e) => {
      console.trace(e);
      return undefined;
    });
}

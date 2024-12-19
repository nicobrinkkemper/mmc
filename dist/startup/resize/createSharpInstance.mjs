import fs from "node:fs/promises";
import sharp from "sharp";
export async function createSharpInstance(inputPath) {
    const imageBuffer = await fs
        .readFile(inputPath)
        .catch((e) => console.trace(e));
    if (!Buffer.isBuffer(imageBuffer))
        throw new Error(`Could not create image buffer at ${inputPath}`);
    const instance = sharp(imageBuffer);
    if (!instance)
        throw new Error(`Could not create sharp instance at ${inputPath}`);
    return instance;
}
//# sourceMappingURL=createSharpInstance.mjs.map
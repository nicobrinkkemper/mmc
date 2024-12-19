import fs from "node:fs/promises";
import path from "node:path";
import { createFolder } from "./createFolder.mjs";
/**
 * Write data to outputPath as json file
 * @param data - Data to write
 * @param outputPath - Path to write to
 */
export async function writeJson(data, outputPath) {
    const { dir: outputDir } = path.parse(outputPath);
    await createFolder(outputDir);
    await fs.writeFile(outputPath, JSON.stringify(data));
}
//# sourceMappingURL=writeJson.mjs.map
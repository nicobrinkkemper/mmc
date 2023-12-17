import path from "node:path";
import fs from "node:fs/promises";
import { createFolder } from "./createFolder";
// create empty json file and create folders
export async function writeJson(data, outputPath) {
    const { dir: outputDir } = path.parse(outputPath);
    await createFolder(outputDir);
    await fs.writeFile(outputPath, JSON.stringify(data));
}

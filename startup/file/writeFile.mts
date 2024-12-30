import fs from "node:fs/promises";
import path from "node:path";
import { createFolder } from "./createFolder.mjs";

/**
 * Write data to outputPath as text file and force create the folder if it doesn't exist
 * @param data - Data to write
 * @param outputPath - Path to write to
 */
export async function writeFile(data: string, outputPath: string) {
  const { dir: outputDir } = path.parse(outputPath);
  await createFolder(outputDir);
  await fs.writeFile(outputPath, data);
}

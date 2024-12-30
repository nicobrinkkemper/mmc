import { writeFile } from "./writeFile.mjs";

/**
 * Write data to outputPath as json file
 * @param data - Data to write
 * @param outputPath - Path to write to
 */
export async function writeJson(data: unknown, outputPath: string) {
  await writeFile(JSON.stringify(data), outputPath);
}

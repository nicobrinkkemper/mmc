import { readdir, stat } from "fs/promises";
import { extname, join } from "node:path";

export async function readDirectoryRecursive(
  path: string,
  allowedExtensions: string[],
  basePath: string = ""
) {
  try {
    const fileNames = await readdir(path);
    let result = {
      folders: [] as string[],
      images: [] as FileReference[],
    };

    for (const fileName of fileNames) {
      const itemPath = join(path, fileName);
      const relativePath = join(basePath, fileName);

      const stats = await stat(itemPath);

      if (stats.isDirectory()) {
        result.folders.push(relativePath);
        // recursion
        const nestedResult = await readDirectoryRecursive(
          itemPath,
          allowedExtensions,
          relativePath
        );
        result = {
          folders: result.folders.concat(nestedResult.folders),
          images: result.images.concat(nestedResult.images),
        };
      } else if (
        stats.isFile() &&
        allowedExtensions.includes(extname(fileName).toLowerCase())
      ) {
        result.images.push({
          path: relativePath,
          size: stats.size,
        });
      }
    }

    return result;
  } catch (error) {
    console.trace(error);
    throw error;
  }
}

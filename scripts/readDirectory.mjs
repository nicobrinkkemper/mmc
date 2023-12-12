import { readdir, stat } from "fs/promises";
import { join, extname } from "path";

export async function readDirectory(path, basePath = "") {
  try {
    const items = await readdir(path);
    let result = { folders: [], images: [] };

    for (const item of items) {
      const itemPath = join(path, item);
      const relativePath = join(basePath, item);

      const stats = await stat(itemPath);

      if (stats.isDirectory()) {
        result.folders.push(relativePath);
        const nestedResult = await readDirectory(itemPath, relativePath);
        result = {
          folders: result.folders.concat(nestedResult.folders),
          images: result.images.concat(nestedResult.images),
        };
      } else if (stats.isFile() && isImageFile(item)) {
        result.images.push(relativePath);
      }
    }

    return result;
  } catch (error) {
    throw new Error(`Error reading directory: ${error.message}`);
  }
}

function isImageFile(fileName) {
  const allowedExtensions = [".png", ".jpg", ".jpeg"];
  const extension = extname(fileName).toLowerCase();
  return allowedExtensions.includes(extension);
}

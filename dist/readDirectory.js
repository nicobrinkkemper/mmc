import { startupDir } from "./startupDir";
import { readdir, stat } from "fs/promises";
import { join, extname } from "path";
export async function readDirectory(path, allowedExtensions = [".png", ".jpg", ".jpeg", ".webp", ".svg"], basePath = startupDir) {
    try {
        const fileNames = await readdir(path);
        let result = { folders: [], images: [] };
        for (const fileName of fileNames) {
            const itemPath = join(path, fileName);
            const relativePath = join(basePath, fileName);
            const stats = await stat(itemPath);
            if (stats.isDirectory()) {
                result.folders.push(relativePath);
                // recursion
                const nestedResult = await readDirectory(itemPath, allowedExtensions, relativePath);
                result = {
                    folders: result.folders.concat(nestedResult.folders),
                    images: result.images.concat(nestedResult.images),
                };
            }
            else if (stats.isFile() &&
                allowedExtensions.includes(extname(fileName).toLowerCase())) {
                result.images.push(relativePath);
            }
        }
        return result;
    }
    catch (error) {
        console.trace(error);
        throw error;
    }
}

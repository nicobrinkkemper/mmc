import { rename } from "fs/promises";
import path from "path";
import { createFolder } from "./file/createFolder.mjs";
import { readDirectoryRecursive } from "./file/readDirectoryRecursive.mjs";
import { createSharpInstance } from "./resize/createSharpInstance.mjs";
import { resizeConfig } from "./resizeConfig.mjs";

const MAX_WIDTH = 2048;
const QUALITY = 90;
/**
 * Resize image to a maximum width of 2048px, while maintaining the original format.
 * This will ensure that our repo size will not grow too much.
 * We do not need to run this often, you can run `npm run resize-original-images` to resize all images, and automatically commit the changes later.
 * The idea is that we will only touch the files that are arguably too big but keep the original format as much as possible.
 */
async function processImage(filePath: string) {
  try {
    const instance = await createSharpInstance(filePath);
    const metadata = await instance.metadata();

    if (!metadata.width) {
      console.warn(`No width metadata for: ${filePath}`);
      return;
    }

    // Only resize if image is larger than MAX_WIDTH
    if (metadata.width > MAX_WIDTH) {
      // Keep original extension to maintain format
      const outputPath = filePath.replace(
        /\.(jpg|png|jpeg)$/i,
        (match) => match
      );
      const outputDir = path.dirname(outputPath);

      await createFolder(outputDir);

      await instance
        .resize(MAX_WIDTH, null, {
          withoutEnlargement: true,
          fit: "inside",
        })
        // Keep format-specific settings
        .jpeg({ quality: QUALITY, progressive: true })
        .png({ quality: QUALITY, progressive: true })
        .webp({ quality: QUALITY, alphaQuality: QUALITY })
        .toFile(outputPath + ".tmp");

      // Replace original with resized version
      await rename(outputPath + ".tmp", outputPath);

      console.log(
        `Resized: ${path.basename(filePath)} (${
          metadata.width
        }px -> ${MAX_WIDTH}px)`
      );
    } else {
      console.log(
        `Skipping (already optimal size): ${path.basename(filePath)}`
      );
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

async function processAllImages() {
  try {
    const { images } = await readDirectoryRecursive(resizeConfig.inputPath, [
      ".png",
      ".jpg",
      ".jpeg",
      ".webp",
      ".svg",
    ]);

    console.log(`Found ${images.length} source images to process`);

    for (const image of images) {
      const fullPath = path.join(resizeConfig.inputPath, image.path);
      await processImage(fullPath);
    }

    console.log("Source image processing complete");
  } catch (error) {
    console.error("Error during image processing:", error);
  }
}

processAllImages().catch(console.error);

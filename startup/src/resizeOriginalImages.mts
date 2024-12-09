import fs from 'fs/promises';
import path from 'path';
import { createFolder } from './file/createFolder.mjs';
import { readDirectory } from './file/readDirectory.mjs';
import { createSharpInstance } from './resize/createSharpInstance.mjs';
import { resizeConfig } from './resizeConfig.mjs';

const MAX_WIDTH = 2048;
const QUALITY = 90;

async function processImage(filePath: string) {
    try {
        const instance = await createSharpInstance(filePath);
        const metadata = await instance.metadata();

        if (!metadata.width) {
            console.log(`No width metadata for: ${filePath}`);
            return;
        }

        // Only resize if image is larger than MAX_WIDTH
        if (metadata.width > MAX_WIDTH) {
            // Keep original extension to maintain format
            const outputPath = filePath.replace(/\.(jpg|png|jpeg)$/i, (match) => match);
            const outputDir = path.dirname(outputPath);

            await createFolder(outputDir);

            await instance
                .resize(MAX_WIDTH, null, {
                    withoutEnlargement: true,
                    fit: 'inside'
                })
                // Maintain original format but with high quality
                .jpeg({ quality: QUALITY, progressive: true })
                .toFile(outputPath + '.tmp');

            // Replace original with resized version
            await fs.rename(outputPath + '.tmp', outputPath);

            console.log(`Resized: ${path.basename(filePath)} (${metadata.width}px -> ${MAX_WIDTH}px)`);
        } else {
            console.log(`Skipping (already optimal size): ${path.basename(filePath)}`);
        }
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
    }
}

async function processAllImages() {
    try {
        const { images } = await readDirectory(resizeConfig.inputPath);

        console.log(`Found ${images.length} source images to process`);

        for (const image of images) {
            const fullPath = path.join(resizeConfig.inputPath, image.path);
            await processImage(fullPath);
        }

        console.log('Source image processing complete');
    } catch (error) {
        console.error('Error during image processing:', error);
    }
}

processAllImages().catch(console.error);
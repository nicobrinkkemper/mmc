import { resizeImages } from "./resizeImages.mjs";
import { resizeJobs } from "./resizeJobs.mjs";
import { readDirectory } from "./readDirectory.mjs";

/**
 * Throw any image into the "resizeImages" folder at the corresponding folder you want it to resize to.
 */

const inputPath = "./scripts/resizeImages"; // from resizeImages
const outputDirData = "./src/data";
const outputDir = "./"; // copy to root of folder

try {
  await resizeImages({
    images: (await readDirectory(inputPath)).images,
    getInfo: resizeJobs,
    inputPath,
    outputDir,
    outputDirData,
  }).catch(console.trace);
} catch (e) {
  console.error(e);
}

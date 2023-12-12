import path from "node:path";
import { readDirectory } from "./readDirectory.mjs";
import { resizeImages } from "./resizeImages.mjs";
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const imagesDir = path.join(__dirname, "resizeImages");
const { images } = await readDirectory(imagesDir);

/**
 * Throw any image into the "resizeImages" folder at the corresponding folder you want it to resize to.
 */
const getInfo = ({
  // filePath,
  // name,
  // dirname,
  // filenameWithoutExt,
  // ext,
  originalSize,
  relativeInputPath,
}) => {
  const isPublic = relativeInputPath.includes("public");
  const isSmall = originalSize.width < 500;
  const isReallySmall = originalSize.width < 250;
  if (isPublic) return [{ width: 500 }, { width: 250 }];
  if (isReallySmall) return [{ width: originalSize.width }];
  if (isSmall) return [{ width: originalSize.width }, { width: 250 }];
  return [1, 2, 3].map((divider) => ({
    width: Math.min(
      originalSize.width,
      Math.round(originalSize.width / divider)
    ),
  }));
};

await resizeImages(images, getInfo, imagesDir, "./resizeTest");

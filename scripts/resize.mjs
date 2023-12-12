import { readDirectory } from "./resizeImages/readDirectory.mjs";
import { resizeImages } from "./resizeImages/resizeImages.mjs";

const imagesDir = "scripts/resizeImages"; // from resizeImages
const outputDir = "./"; // copy to root of folder

const { images } = await readDirectory(imagesDir);
// 8mmc makers https://drive.google.com/drive/folders/1nrBru6P3YSI4Yqv9ZcBlZzb5-Sl5sQeA

const noResize = {
  ext: ".webp",
  widthName: false,
};

const resizeX = (width) => (divider, index) => ({
  widthName: index + 1,
  widthSuffix: "x",
  ext: ".webp",
  resize:
    divider === 1
      ? undefined
      : {
          width: Math.min(width, Math.round(width / divider)),
        },
});

const resizeLevel = [
  {
    ext: ".webp",
    widthPrefix: "-",
    resize: { width: 58, height: 33 },
  },
  {
    ext: ".webp",
    widthPrefix: "-",
    resize: { width: 580, height: 326 },
  },
  {
    ext: ".webp",
    widthPrefix: "-",
    resize: { width: 1160, height: 652 },
  },
  {
    ext: ".webp",
    widthPrefix: "-",
    resize: { width: 11, height: 11 },
  },
  {
    ext: ".webp",
    widthPrefix: "-",
    resize: { width: 110, height: 110 },
  },
  {
    ext: ".webp",
    widthPrefix: "-",
    resize: { width: 220, height: 220 },
  },
];

const resizeMaker = [
  {
    ext: ".webp",
    widthPrefix: "-",
    resize: { width: 18, height: 18 },
  },
  {
    ext: ".webp",
    widthPrefix: "-",
    resize: { width: 180, height: 180 },
  },
  {
    ext: ".webp",
    widthPrefix: "-",
    resize: { width: 360, height: 360 },
  },
];
const resizeIllustration = [
  {
    ext: ".webp",
    widthName: "-22",
    resize: { width: 40 },
  },
  {
    ext: ".webp",
    widthName: "-220",
    resize: { width: 400 },
  },
  {
    ext: ".webp",
    widthName: "-440",
    resize: { width: 800 },
  },
];
const resizeLogo = [
  {
    ext: ".webp",
    widthName: "-20",
    resize: { height: 20 },
  },
  {
    ext: ".webp",
    widthName: "-200",
    resize: { height: 200 },
  },
  {
    ext: ".webp",
    widthName: "-400",
    resize: { height: 400 },
  },
];
const resizeMainLogo = [
  {
    // x6 x60 x120
    ext: ".webp",
    widthName: "-6",
    resize: { height: 6 },
  },
  {
    ext: ".webp",
    widthName: "-60",
    resize: { height: 60 },
  },
  {
    ext: ".webp",
    widthName: "-120",
    resize: { height: 120 },
  },
  ...resizeLogo,
];

const resizeFavicon = [
  {
    ext: ".ico",
    widthName: "",
    resize: { width: 32, height: 32 },
  },
  {
    ext: ".ico",
    widthName: "-64x64",
    resize: { width: 64, height: 64 },
  },
  {
    ext: ".ico",
    widthName: "-192x192",
    resize: { width: 192, height: 192 },
  },
  {
    ext: ".ico",
    widthName: "-512x512",
    resize: { width: 512, height: 512 },
  },
];

/**
 * Throw any image into the "resizeImages" folder at the corresponding folder you want it to resize to.
 */
const getInfo = ({
  // filePath,
  // name,
  // dirname,
  filenameWithoutExt,
  ext,
  originalSize: { width },
  relativeInputPath,
}) => {
  console.log(filenameWithoutExt);
  if (filenameWithoutExt === "favicon") return resizeFavicon;
  if (filenameWithoutExt === "illustration") return resizeIllustration;
  if (filenameWithoutExt === "logo") return resizeMainLogo;
  if (filenameWithoutExt === "logo_special") return resizeLogo;
  if (filenameWithoutExt === "logo_simple") return resizeLogo;
  if (ext === ".svg") return [{}];
  const isLevel = relativeInputPath.includes("level");
  const isMaker = relativeInputPath.includes("maker");
  if (isLevel) return resizeLevel;
  if (isMaker) return resizeMaker;
  if (width < 500) return [noResize];
  return [3, 2, 1].map(resizeX(width));
};

await resizeImages(images, getInfo, imagesDir, outputDir);

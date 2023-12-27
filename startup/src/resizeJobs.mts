import type { ResizeJobsFn, ResizeUserInfo } from "./resize/types.mjs";

const resizeX = (width: number) => (divider: number, index: number) => ({
  fileName: `[snakecase]-${index + 1}x.webp`,
  version: index + 1,
  resize:
    divider === 1
      ? {}
      : {
          width: Math.min(width, Math.round(width / divider)),
        },
});

const resizeLevel: ResizeUserInfo[] = [
  {
    fileName: "[snakecase]-[width].webp",
    resize: { width: 580, height: 326 },
    main: true,
  },
  {
    fileName: "[snakecase]-[width].webp",
    resize: { width: 1160, height: 652 },
  },
  {
    fileName: "[snakecase]-[width].webp",
    resize: { width: 110, height: 110 },
    main: true,
    reference: "_thumbnail",
  },
  {
    fileName: "[snakecase]-[width].webp",
    resize: { width: 220, height: 220 },
    reference: "_thumbnail",
  },
];

const resizeMaker: ResizeUserInfo[] = [
  {
    fileName: "[snakecase]-[width].webp",
    resize: { width: 180, height: 180 },
    main: true,
  },
  {
    fileName: "[snakecase]-[width].webp",
    resize: { width: 360, height: 360 },
  },
];
const resizeIllustration: ResizeUserInfo[] = [
  {
    fileName: "[snakecase]-[width].webp",
    resize: { width: 220 },
    main: true,
  },
  {
    fileName: "[snakecase]-[width].webp",
    resize: { width: 440 },
  },
];

const resizeLogoSpecial: ResizeUserInfo[] = [
  {
    fileName: "[snakecase]-[height].webp",
    resize: { height: 200 },
    main: true,
  },
  {
    fileName: "[snakecase]-[height].webp",
    resize: { height: 400 },
  },
];

const resizeMainLogo: ResizeUserInfo[] = [
  {
    fileName: "[snakecase]-[height].webp",
    resize: { height: 60 },
    reference: "_small",
    main: true,
  },
  {
    fileName: "[snakecase]-[height].webp",
    resize: { height: 120 },
    reference: "_small",
  },
  {
    fileName: "[snakecase]-[height].webp",
    resize: { height: 200 },
    main: true,
  },
  {
    fileName: "[snakecase]-[height].webp",
    resize: { height: 400 },
  },
];

const resizeFavicon: ResizeUserInfo[] = [
  {
    fileName: "favicon.ico",
    resize: { width: 32, height: 32 },
  },
  {
    fileName: "favicon-[width]x[height].ico",
    resize: { width: 64, height: 64 },
  },
  {
    fileName: "favicon-[width]x[height].ico",
    resize: { width: 192, height: 192 },
  },
  {
    fileName: "favicon-[width]x[height].ico",
    resize: { width: 512, height: 512 },
  },
];

const copySvg: ResizeUserInfo[] = [
  {
    fileName: `[snakecase].svg`,
    copy: true,
  },
];

const webp: ResizeUserInfo[] = [
  {
    fileName: `[snakecase].webp`,
    resize: {},
  },
];

/**
 * Determine what resize jobs to do with each image.
 */
export const resizeJobs: ResizeJobsFn = ({
  name,
  ext,
  originalSize,
  relativeInputPath,
}) => {
  if (name === "favicon") return resizeFavicon;
  if (name === "illustration") return resizeIllustration;
  if (name === "logo") return resizeMainLogo;
  if (name === "logo_simple") return resizeMainLogo;
  if (name === "logo_special") return resizeLogoSpecial;
  if (ext === ".svg") return copySvg;
  if (relativeInputPath.includes("level")) return resizeLevel;
  if (relativeInputPath.includes("maker")) return resizeMaker;
  if (originalSize.width < 500) return webp;

  return [3, 2, 1].map(resizeX(originalSize.width));
};

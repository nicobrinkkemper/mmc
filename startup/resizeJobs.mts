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

const resizeBatchCard: ResizeUserInfo[] = [
  {
    fileName: "[snakecase]-[width].webp",
    resize: { width: 80 },
    main: true,
  },
  {
    fileName: "[snakecase]-[width].webp",
    resize: { width: 160 },
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
    main: true,
  },
  {
    fileName: "favicon-[width]x[height].ico",
    resize: { width: 64, height: 64 },
    reference: "_64x64",
  },
  {
    fileName: "mstile-[width]x[height].ico",
    resize: { width: 150, height: 150 },
    reference: "_150x150",
  },
  {
    fileName: "favicon-[width]x[height].ico",
    resize: { width: 192, height: 192 },
    reference: "_192x192",
  },
  {
    fileName: "favicon-[width]x[height].ico",
    resize: { width: 512, height: 512 },
    reference: "_512x512",
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

const _404: ResizeUserInfo[] = [
  {
    fileName: `[snakecase].webp`,
    resize: {
      width: 420,
    },
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
  if (name === "404") return _404;
  if (name === "illustration") return resizeIllustration;
  if (name === "logo") return resizeMainLogo;
  if (name === "logo_simple") return resizeMainLogo;
  if (name === "logo_special") return resizeLogoSpecial;
  if (ext === ".svg") return copySvg;
  if (relativeInputPath.includes("level")) return resizeLevel;
  if (relativeInputPath.includes("maker")) return resizeMaker;
  if (relativeInputPath.includes("batch")) return resizeBatchCard;
  if (originalSize.width < 500) return webp;

  return [3, 2, 1].map(resizeX(originalSize.width));
};

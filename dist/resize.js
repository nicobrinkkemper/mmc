import { resizeImages } from "./resizeImages";
import { readDirectory } from "./readDirectory";
/**
 * Throw any image into the "resizeImages" folder at the corresponding folder you want it to resize to.
 */
const inputPath = "scripts/resizeImages"; // from resizeImages
const outputDirData = "./src/data";
const outputDir = "./"; // copy to root of folder
const { images } = await readDirectory(inputPath);
// 8mmc makers https://drive.google.com/drive/folders/1nrBru6P3YSI4Yqv9ZcBlZzb5-Sl5sQeA
const resizeX = (width) => (divider, index) => ({
    fileName: `[snakecase]-${index + 1}x.webp`,
    version: index + 1,
    resize: divider === 1
        ? {}
        : {
            width: Math.min(width, Math.round(width / divider)),
        },
});
const resizeLevel = [
    {
        fileName: "[snakecase]-[width].webp",
        resize: { width: 580, height: 326 },
        placeholder: true,
    },
    {
        fileName: "[snakecase]-[width].webp",
        resize: { width: 1160, height: 652 },
    },
    {
        fileName: "[snakecase]-[width].webp",
        resize: { width: 110, height: 110 },
        placeholder: true,
        reference: "_thumbnail",
    },
    {
        fileName: "[snakecase]-[width].webp",
        resize: { width: 220, height: 220 },
        reference: "_thumbnail",
    },
];
const resizeMaker = [
    {
        fileName: "[snakecase]-[width].webp",
        resize: { width: 180, height: 180 },
        placeholder: true,
    },
    {
        fileName: "[snakecase]-[width].webp",
        resize: { width: 360, height: 360 },
    },
];
const resizeIllustration = [
    {
        fileName: "[snakecase]-[width].webp",
        resize: { width: 220 },
        placeholder: true,
    },
    {
        fileName: "[snakecase]-[width].webp",
        resize: { width: 440 },
    },
];
const resizeLogoSpecial = [
    {
        fileName: "[snakecase]-[height].webp",
        resize: { height: 200 },
        placeholder: true,
    },
    {
        fileName: "[snakecase]-[height].webp",
        resize: { height: 400 },
    },
];
const resizeMainLogo = [
    {
        fileName: "[snakecase]-[height].webp",
        resize: { height: 60 },
        reference: "_small",
        placeholder: true,
    },
    {
        fileName: "[snakecase]-[height].webp",
        resize: { height: 120 },
        reference: "_small",
    },
    {
        fileName: "[snakecase]-[height].webp",
        resize: { height: 200 },
        placeholder: true,
    },
    {
        fileName: "[snakecase]-[height].webp",
        resize: { height: 400 },
    },
];
const resizeFavicon = [
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
const copySvg = [
    {
        fileName: `[snakecase].svg`,
        copy: true,
    },
];
const webp = [
    {
        fileName: `[snakecase].webp`,
        resize: {},
    },
];
const getInfo = ({ name, ext, originalSize, relativeInputPath, }) => {
    if (name === "favicon")
        return resizeFavicon;
    if (name === "illustration")
        return resizeIllustration;
    if (name === "logo")
        return resizeMainLogo;
    if (name === "logo_simple")
        return resizeMainLogo;
    if (name === "logo_special")
        return resizeLogoSpecial;
    if (ext === ".svg")
        return copySvg;
    if (relativeInputPath.includes("level"))
        return resizeLevel;
    if (relativeInputPath.includes("maker"))
        return resizeMaker;
    if (typeof originalSize.width === "number" && originalSize.width < 500)
        return webp;
    if (typeof originalSize.width === "number")
        return [3, 2, 1].map(resizeX(originalSize.width));
    throw new Error(`no original size for ${name} ${ext}`);
};
try {
    await resizeImages({
        images,
        getInfo,
        inputPath,
        outputDir,
        outputDirData,
    }).catch(console.trace);
}
catch (e) {
    console.error(e);
}

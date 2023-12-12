import path from "node:path";
import fs from "node:fs/promises";
import sharp from "sharp";
import sizeOf from "image-size";

export async function resizeImages(images, getInfo, inputPath, outputPath) {
  try {
    const imageInfos = images.flatMap((outputFilePath) =>
      info(outputFilePath, getInfo, inputPath, outputPath)
    );
    for (const image of imageInfos) {
      const { dir: outputDir, ext: outputExt } = path.parse(
        image.imageOutputPath
      );

      const exists = await fs.stat(image.imageOutputPath).catch(() => false);
      if (exists) continue;
      if (Object.keys(image.userInfo).length === 0) {
        await fs.copyFile(image.imageInputPath, image.imageOutputPath);
        continue;
      }

      const imageBuffer = await fs.readFile(image.imageInputPath);

      console.info(image.imageOutputPath);

      await fs.mkdir(outputDir, {
        recursive: true,
      });

      const instance = await sharp(imageBuffer);
      if (image.userInfo.ext === ".webp") await instance.webp();
      if (image.userInfo.resize) await instance.resize(image.userInfo.resize);
      await instance.toFile(image.imageOutputPath);
    }
  } catch (error) {
    console.trace(error);
    throw new Error(`resizing images: ${error.message}`);
  }
}

function info(outputFilePath, getInfo, inputPath, outputPath) {
  let { dir, name, ext } = path.parse(outputFilePath);
  const imageInputPath = path.join(inputPath, outputFilePath);
  const dirname = path.dirname(dir);
  const filenameWithoutExt = name;
  const originalSize = sizeOf(imageInputPath);
  const relativeInputPath = path.relative(inputPath, imageInputPath);
  let outputFolder = path.join(outputPath, dir);

  const getInfoInput = {
    imageInputPath,
    outputFilePath,
    name,
    dir,
    dirname,
    filenameWithoutExt,
    ext,
    originalSize,
    inputPath,
    outputPath,
    relativeInputPath,
    outputFolder,
  };
  let userInfos = getInfo(getInfoInput);
  if (typeof userInfos !== "object")
    throw new Error(`no userInfo at ${imageInputPath}`);
  if (!Array.isArray(userInfos)) userInfos = [userInfos];

  return userInfos.map((userInfo) => {
    let widthPrefix = userInfo.widthPrefix || "";
    let widthSuffix = userInfo.widthSuffix || "";
    let widthName =
      userInfo.widthName === false
        ? ""
        : widthPrefix +
          (() => {
            if (
              typeof userInfo.widthName === "string" ||
              typeof userInfo.widthName === "number"
            )
              return userInfo.widthName;
            if (!userInfo.resize || isNaN(userInfo.resize.width))
              return originalSize.width;
            return userInfo.resize.width;
          })() +
          widthSuffix;
    if (userInfo.ext) ext = userInfo.ext;
    else if (ext === ".svg") {
      widthName = "";
    } else ext = ".webp";
    const imageOutputPath = path.join(
      outputFolder,
      `${filenameWithoutExt}${widthName}${ext}`
    );

    return {
      relativeInputPath,
      imageInputPath,
      imageOutputPath,
      userInfo,
    };
  });
}

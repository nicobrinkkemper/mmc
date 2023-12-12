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
      const imageBuffer = await fs.readFile(image.imageInputPath);
      console.log(`from ${image.imageInputPath} (${image.originalSize.width})`);
      console.log(`to ${image.outputFile} (${image.width})`);
      await sharp(imageBuffer)
        .webp()
        .resize({ width: image.width })
        .toFile(image.outputFile);
    }
  } catch (error) {
    throw new Error(`resizing images: ${error.message}`);
  }
}

function info(outputFilePath, getInfo, inputPath, outputPath) {
  console.log(outputFilePath);
  const { dir, name, ext } = path.parse(outputFilePath);
  const imageInputPath = path.join(inputPath, outputFilePath);
  const dirname = path.dirname(dir);
  const filenameWithoutExt = name;
  const originalSize = sizeOf(imageInputPath);
  const relativeInputPath = path.relative(inputPath, imageInputPath);
  const outputFolder = path.join(outputPath, dir);

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
    if (isNaN(userInfo.width)) {
      throw new Error(`width is ${userInfo.width} at ${imageInputPath}`);
    }
    const outputImage = `${filenameWithoutExt}_${userInfo.width}${ext}`;
    const outputFile = path.join(outputFolder, outputImage);
    console.log("outputFile", outputFile);
    return {
      ...getInfoInput,
      ...userInfo,
      outputImage,
      outputFile,
    };
  });
}

import path from "node:path";
import { FileReference } from "../file/types.mjs";
import { resizeConfig } from "../resizeConfig.mjs";
import { resizeJobs } from "../resizeJobs.mjs";
import { createResizeJobOutput } from "./createResizeJobOutput.mjs";
import { sizeOf } from "./sizeOf.mjs";
import type { ResizeJob } from "./types.mjs";

// ISize,ISizeCalculationResult are copied over from imageSize to avoid importing it

// This narrows the type while also making sure that the imageSize results are what we expect

export function createResizeJobs(
  inputFile: FileReference
): Promise<ResizeJob>[] {
  const outputFilePath = inputFile.path;
  let { dir, name, ext } = path.parse(outputFilePath);
  const inputPath = path.join(resizeConfig.inputPath, outputFilePath);
  const dirname = path.basename(dir);
  const filenameWithoutExt = name;

  const originalSize = sizeOf(inputPath);
  const relativeInputPath = path.relative(resizeConfig.inputPath, inputPath);

  let outputFolder = path.join(resizeConfig.outputDir, dir);

  const original: ResizeJob["original"] = {
    inputPath,
    outputFilePath,
    name,
    dir,
    dirname,
    filenameWithoutExt,
    ext,
    originalSize,
    originalFileSize: inputFile.size,
    relativeInputPath,
    outputFolder,
  };

  const userInfos = resizeJobs(original);

  if (!Array.isArray(userInfos)) {
    throw new Error(`resizeJobs must return an array of jobs`);
  }

  return userInfos.map(async (userInfo) => {
    if (!userInfo.fileName)
      throw new Error(`no fileName at ${JSON.stringify(userInfo)}`);
    const output = await createResizeJobOutput({
      userInfo,
      original,
    });
    return {
      original,
      output,
      userInfo,
    };
  });
}

import path from "node:path";
import fs from "node:fs/promises";
import sharp, { ResizeOptions } from "sharp";
import { fileStat } from "../file/stat.mjs";
import _ from "lodash";
import { ResizeImagesProps, ResizeJob } from "./types.mjs";
import { createFolder } from "../file/createFolder.mjs";
import {
  ImageJsonStructure,
  resizeJobGroupToData,
} from "./resizeJobGroupToData.mjs";
import { createResizeJobs } from "./createResizeJobs.mjs";
import { isSameFile } from "../file/isSameFile.mjs";
import { readDirectory } from "../file/readDirectory.mjs";

/**
 * Creates a placeholder base64 string from the given resize options and sharp instance.
 */
async function toPlaceholderBase64(job: ResizeJob, instance: sharp.Sharp) {
  if (!job.original.originalSize.width) throw new Error("no original width");
  if (!job.original.originalSize.height) throw new Error("no original height");
  const resize = aspectRatio({
    originalWidth: job.original.originalSize.width,
    originalHeight: job.original.originalSize.height,
    ...job.userInfo.resize,
  });
  const buffer = await instance
    .resize(resize)
    .toBuffer()
    .catch((e) => {
      console.trace(e);
      return undefined;
    });
  if (!buffer) return "";
  return buffer.toString("base64");
}

async function outputResizedImage(job: ResizeJob, instance: sharp.Sharp) {
  if (!job.userInfo.resize) {
    console.log("skipping", job.output.file);
    return;
  }
  if (path.parse(job.output.file).dir === ".webp") instance.webp();
  instance.resize(job.userInfo.resize);
  // only do comparison if strict is true and output file exists
  if (job.output.exists && job.output.strict) {
    const b1 = await instance.webp().toBuffer();
    if (
      await fs
        .readFile(job.output.file)
        .then((b2) => Buffer.compare(b1, b2) === 0)
    ) {
      job.output.shouldOutput = false;
      return; // files are the same, so don't output
    }
  }
  return instance.toFile(job.output.file).catch((e) => {
    console.trace(e);
    return undefined;
  });
}

async function outputCopyImage(job: ResizeJob) {
  if (!job.userInfo.copy) return;
  const { name, ext } = path.parse(job.output.file);
  const outputFile = path.join(job.output.folder, name + ext);
  await fs.copyFile(job.original.inputPath, outputFile).catch(console.trace);
  return outputFile;
}

async function shouldOutputImage(job: ResizeJob) {
  if (!job.output.exists) {
    console.log("Resizing:", job.output.file);
    return true;
  }
  // only do comparison if strict is true
  const isSame = job.output.strict
    ? await isSameFile(
        path.resolve(job.original.inputPath),
        path.resolve(job.output.file)
      ).catch((e) => {
        console.trace(e);
        return true;
      })
    : true;
  return !isSame;
}

function aspectRatio({
  originalWidth,
  originalHeight,
  maxWidth,
  maxHeight,
}: {
  originalWidth: number;
  originalHeight: number;
  maxWidth?: number;
  maxHeight?: number;
}) {
  if (maxWidth && !maxHeight)
    maxHeight = (originalHeight / originalWidth) * maxWidth; // = new height;
  if (!maxWidth && maxHeight)
    maxWidth = (originalWidth / originalHeight) * maxHeight; // = new width;
  if (!maxWidth || !maxHeight) throw new Error("no maxWidth or maxHeight");
  const ratio = Math.min(maxWidth / originalWidth, maxHeight / originalHeight);
  return {
    width: Math.round(originalWidth * ratio * 100) / 100,
    height: Math.round(originalHeight * ratio * 100) / 100,
  };
}

async function createSharpInstance(job: ResizeJob) {
  const imageBuffer = await fs
    .readFile(job.original.inputPath)
    .catch((e) => console.trace(e));
  if (Buffer.isBuffer(imageBuffer)) return sharp(imageBuffer);
}

const mapImagesToResizeJobs = (images: string[], props: ResizeImagesProps) =>
  images.flatMap((path) => createResizeJobs(path, props));

const mapPropsToResizeJobs = (images: string[], props: ResizeImagesProps) =>
  Object.entries(
    _.groupBy(mapImagesToResizeJobs(images, props), (job) => job.original.dir)
  );

export async function resizeImages(props: ResizeImagesProps) {
  const resizeInfo = {} as Record<
    string,
    ReturnType<typeof resizeJobGroupToData>
  >;
  try {
    const images =
      props.images ?? (await readDirectory(props.inputPath)).images;
    for (const [group, jobGroup] of mapPropsToResizeJobs(images, props)) {
      for (const job of jobGroup) {
        await createFolder(job.output.folder);
        job.output.exists = await fileStat(job.output.file);
        job.output.shouldOutput = await shouldOutputImage(job);
        if (!job.output.shouldOutput) continue;
        job.output.isReplaced = job.output.exists && job.output.shouldOutput;
        job.output.copy = await outputCopyImage(job);
        const instance = await createSharpInstance(job);
        if (instance === undefined) continue;
        job.output.sharpOutputInfo = await outputResizedImage(job, instance);
        if (
          job.output.reference &&
          job.userInfo.placeholder &&
          job.userInfo.resize
        )
          job.output.placeholder = await toPlaceholderBase64(job, instance);
      }
      const data = resizeJobGroupToData(jobGroup);
      resizeInfo[group] = resizeInfo[group]
        ? Object.assign(resizeInfo[group], data)
        : data;
    }
    return resizeInfo;
  } catch (e) {
    console.trace(e);
  }
}

export async function resizeFolders(props: ResizeImagesProps) {
  try {
    const resizeInfo = await resizeImages(props);
    if (!resizeInfo) throw new Error("No resizeInfo");
    const entries = Object.entries(resizeInfo);
    if (!entries.length) throw new Error("No resizeInfo");
    const directoryGrouping = [
      ...entries.map(([group, value]) => ({
        [group.split(path.sep)[0] || "resized"]: {
          [group.split(path.sep)[1] || "versions"]: {
            [group.split(path.sep)[2] || "images"]: value,
          },
        },
      })),
    ];
    const resizedFolders = _.merge({}, ...directoryGrouping) as Record<
      string,
      Record<string, Record<string, ImageJsonStructure>>
    >;
    return resizedFolders;
  } catch (e) {
    console.trace(e);
  }
}

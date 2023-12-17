import path from "node:path";
import fs from "node:fs/promises";
import sharp, { ResizeOptions } from "sharp";
import { fileStat } from "./stat.mjs";
import _ from "lodash";
import { ResizeImagesProps, ResizeJob } from "./types.mjs";
import { createFolder } from "./createFolder.mjs";
import { jobGroupToData } from "./resizeJobGroupToData.mjs";
import { writeJson } from "./writeJson.mjs";
import { createResizeJobs } from "./createResizeJobs.mjs";
import { isSameFile } from "./isSameFile.mjs";

function divideResizeBy(resize: ResizeOptions, by: number): ResizeOptions {
  for (let key of ["width", "height"] as const)
    if (key in resize) resize[key] = Math.ceil(Number(resize[key]) / by);
  return resize;
}

async function outputPlaceholder(job: ResizeJob, instance: sharp.Sharp) {
  if (
    !(job.output.reference && job.userInfo.placeholder && job.userInfo.resize)
  )
    return;
  const buffer = await instance
    .resize(divideResizeBy(job.userInfo.resize, 32))
    .toBuffer()
    .catch((e) => {
      console.trace(e);
      return undefined;
    });
  if (!buffer) return undefined;
  return buffer.toString("base64");
}

async function outputResizedImage(job: ResizeJob, instance: sharp.Sharp) {
  if (!job.userInfo.resize) {
    console.log("skipping", job.output.file);
    return;
  }
  if (path.parse(job.output.file).dir === ".webp") instance.webp();
  instance.resize(job.userInfo.resize);
  const b1 = await instance.webp().toBuffer();
  if (job.output.exists) {
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
  const isSame = await isSameFile(
    path.resolve(job.original.inputPath),
    path.resolve(job.output.file)
  ).catch((e) => {
    console.trace(e);
    return true;
  });
  // its literally the same file, so don't output
  if (isSame) return false;
  return true;
}

async function createSharpInstance(job: ResizeJob) {
  const imageBuffer = await fs
    .readFile(job.original.inputPath)
    .catch((e) => console.trace(e));
  if (Buffer.isBuffer(imageBuffer)) return sharp(imageBuffer);
}

const mapImagesToResizeJobs = (props: ResizeImagesProps) =>
  props.images.flatMap((path) => createResizeJobs(path, props));

const mapPropsToResizeJobs = (props: ResizeImagesProps) =>
  Object.entries(
    _.groupBy(mapImagesToResizeJobs(props), (job) => job.original.dir)
  );

export async function resizeImages(props: ResizeImagesProps) {
  const { outputDirData = "./resize-data" } = props;
  try {
    for (const [group, jobGroup] of mapPropsToResizeJobs(props)) {
      for (const job of jobGroup) {
        //console.log("start", job.output.file);
        await createFolder(job.output.folder);
        job.output.exists = await fileStat(job.output.file);
        //console.log("exists", job.output.exists);
        job.output.shouldOutput = await shouldOutputImage(job);
        //console.log("shouldOutput", job.output.shouldOutput);
        if (!job.output.shouldOutput) continue;
        job.output.isReplaced = job.output.exists && job.output.shouldOutput;
        job.output.copy = await outputCopyImage(job);
        const instance = await createSharpInstance(job);
        if (instance === undefined) continue;
        job.output.sharpOutputInfo = await outputResizedImage(job, instance);
        job.output.placeholder = await outputPlaceholder(job, instance);
      }
      const data = jobGroupToData(jobGroup);
      await writeJson(data, path.join(outputDirData, group, "images.json"));
    }
  } catch (e) {
    console.trace(e);
  }
}

import _ from "lodash";
import { ResizeJob, ResizeJobDone } from "./types.mjs";
import { createFolder } from "../file/createFolder.mjs";
import { resizeJobGroupToData } from "./resizeJobGroupToData.mjs";
import { createResizeJobs } from "./createResizeJobs.mjs";
import { readDirectory } from "../file/readDirectory.mjs";
import { FileReference } from "../file/types.mjs";
import { outputResizedImage } from "./outputResizedImage.mjs";

import fs from "fs/promises";
import { resizeConfig } from "../resizeConfig.mjs";
import { ratio } from "./ratio.mjs";
import { sizeOf } from "./sizeOf.mjs";

const mapPropsToResizeJobs = async (images: FileReference[]) => {
  const imageJobs = await Promise.all(
    images.flatMap((stat) => createResizeJobs(stat))
  );
  return Object.entries(_.groupBy(imageJobs, (job) => job.original.dir));
};

type ResizeInfoType = Record<string, ReturnType<typeof resizeJobGroupToData>>;

async function runResizeJob(job: ResizeJob): Promise<ResizeJobDone> {
  if (!job.output.folderExists) await createFolder(job.output.folder);
  if (!job.output.shouldOutput) {
    const stats = await fs.stat(job.output.file);
    if (!stats.size)
      throw new Error(`${job.output.file} is empty and is not outputted`);
    const { width, height } = sizeOf(job.output.file);
    return {
      ...job,
      resized: {
        width,
        height,
        aspectRatio: ratio(width, height),
        fileSize: stats.size,
      },
    };
  }
  if (job.output.copy) {
    await fs.copyFile(job.original.inputPath, job.output.file);
    return {
      ...job,
      resized: {
        width: job.original.originalSize.width,
        height: job.original.originalSize.height,
        aspectRatio: ratio(
          job.original.originalSize.width,
          job.original.originalSize.height
        ),
        fileSize: job.original.originalFileSize,
      },
    };
  }
  const resized = await outputResizedImage(job);
  if (!resized) throw new Error("resized is undefined");
  return {
    ...job,
    resized,
  };
}

// queue jobs for resizing and await their completion
// return info about the jobs
function queueJobs(jobGroup: ResizeJob[]) {
  return Promise.all(jobGroup.map(runResizeJob));
}

export async function resizeImages() {
  const resizeInfo: ResizeInfoType = {};
  try {
    const { images } = await readDirectory(resizeConfig.inputPath);
    const jobs = await mapPropsToResizeJobs(images);
    for (const [group, jobGroup] of jobs) {
      const resizedJobs = await queueJobs(jobGroup);
      const data = resizeJobGroupToData(resizedJobs);
      resizeInfo[group] = resizeInfo[group]
        ? Object.assign(resizeInfo[group], data)
        : data;
    }
    return resizeInfo;
  } catch (e) {
    console.trace(e);
  }
}

import path from "node:path";
import { imageSize } from "image-size";
import type {
  ResizeImagesProps,
  ResizeJob,
  ResizeJobInput,
  SizeCalculationResult,
} from "./types.mjs";
import { resizeTemplateParsers } from "./resizeTemplateParsers.mjs";
// ISize,ISizeCalculationResult are copied over from imageSize to avoid importing it
interface ISize {
  width: number | undefined;
  height: number | undefined;
  orientation?: number;
  type?: string;
}
interface ISizeCalculationResult extends ISize {
  images?: ISize[];
}
const jobParsers = Object.entries(resizeTemplateParsers);

type ResizeChanges = (readonly [string, string | number])[];
function createChanges(job: ResizeJobInput): ResizeChanges {
  return jobParsers
    .map(([key, parser]) => {
      const found = new RegExp(`\\[${key}\\]`, "g").exec(job.userInfo.fileName);
      if (!found) return found;
      return [key, parser(job)] as const;
    })
    .filter((v): v is Exclude<typeof v, null> => !!v);
}

function versionFromChanges(changes: ResizeChanges) {
  return changes.reduce((acc, change) => {
    const [key, value] = change;
    if (acc !== "") acc += "_";
    if (key === "width" || key === "height") acc += value;
    return acc;
  }, "");
}

function applyChangesToFileName(changes: ResizeChanges, fileName: string) {
  return changes.reduce(
    (acc, [key, value]) => acc.replace(`[${key}]`, `${value}`),
    fileName
  );
}

function addResizeJobOutput(job: ResizeJobInput): ResizeJob {
  if (!job.userInfo.fileName) {
    throw new Error(`no templateName at ${JSON.stringify(job)}`);
  }
  const changes = createChanges(job);

  const outputFileName = !changes
    ? job.userInfo.fileName
    : applyChangesToFileName(changes, job.userInfo.fileName);

  const file = path.join(job.original.outputFolder, outputFileName);

  const href =
    (job.userInfo.href ?? "") +
    path.join(
      file.replace("public/", "").replace("src/", "").replace("assets/", "")
    );
  const version = job.userInfo.version ?? versionFromChanges(changes);

  const reference = job.userInfo.reference
    ? resizeTemplateParsers.snakecase(job) + job.userInfo.reference
    : resizeTemplateParsers.snakecase(job);

  return {
    ...job,
    output: {
      fileName: outputFileName,
      folder: job.original.outputFolder,
      file,
      reference,
      href,
      version,
      changes: Object.fromEntries(changes),
    },
  };
}
// This narrows the type while also making sure that the imageSize results are what we expect
function validateOriginalSize(
  result: ISizeCalculationResult
): asserts result is SizeCalculationResult {
  if (!result) throw new Error(`no output from imageSize`);
  if (typeof result.width !== "number" || isNaN(result.width))
    throw new Error(`no width from imageSize`);
  if (typeof result.height !== "number" || isNaN(result.height))
    throw new Error(`no height from imageSize`);
  if (!result.type) throw new Error(`no type from imageSize`);
}

export function createResizeJobs(
  outputFilePath: string,
  props: ResizeImagesProps
): ResizeJob[] {
  let { dir, name, ext } = path.parse(outputFilePath);
  const inputPath = path.join(props.inputPath, outputFilePath);
  const dirname = path.basename(dir);
  const filenameWithoutExt = name;

  const originalSize = imageSize(inputPath);
  validateOriginalSize(originalSize);
  const relativeInputPath = path.relative(props.inputPath, inputPath);

  let outputFolder = path.join(props.outputDir, dir);

  const original: ResizeJob["original"] = {
    inputPath,
    outputFilePath,
    name,
    dir,
    dirname,
    filenameWithoutExt,
    ext,
    originalSize,
    relativeInputPath,
    outputFolder,
  };

  const userInfos = props.resizeJobs(original);
  if (!Array.isArray(userInfos)) {
    throw new Error(`resizeJobs must return an array of jobs`);
  }

  return userInfos.map((userInfo) => {
    if (!userInfo.fileName)
      throw new Error(`no fileName at ${JSON.stringify(userInfo)}`);
    return addResizeJobOutput({
      userInfo,
      original,
    });
  });
}

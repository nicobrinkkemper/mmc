import path from "node:path";
import { env } from "../env.mjs";
import { fileStat, folderStat } from "../file/stat.mjs";
import { resizeTemplateParsers } from "./resizeTemplateParsers.mjs";

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

/**
 * Creates the output for a resize job
 * @param job - The job containing the userInfo and original
 * @returns userInfo, original and output
 */
export async function createResizeJobOutput(
  job: ResizeJobInput
): Promise<ResizeJob["output"]> {
  if (!job.userInfo.fileName) {
    throw new Error(`no templateName at ${JSON.stringify(job)}`);
  }
  const changes = createChanges(job);

  const outputFileName = !changes
    ? job.userInfo.fileName
    : applyChangesToFileName(changes, job.userInfo.fileName);

  const file = path.join(job.original.outputFolder, outputFileName);
  const BASE_URL = env.VITE_BASE_URL ?? "/";
  const REPLACE_PUBLIC_URL = BASE_URL?.endsWith("/")
    ? BASE_URL
    : BASE_URL + `/`;

  const href =
    (job.userInfo.href ?? "") +
    path.join(file.replace("public" + path.sep, REPLACE_PUBLIC_URL)); // the path without the public folder is the href

  const version = job.userInfo.version ?? versionFromChanges(changes);

  const reference = job.userInfo.reference
    ? resizeTemplateParsers.snakecase(job) + job.userInfo.reference
    : resizeTemplateParsers.snakecase(job);

  const folder = path.parse(file).dir;
  const folderExists = await folderStat(folder);
  const exists = await fileStat(file);

  const shouldOutput = (!exists || job.userInfo.strict) ?? false;
  if (shouldOutput) {
    if (!exists) console.log("new file", file);
    if (job.userInfo.strict) console.log("strict file", file);
  }
  return {
    fileName: outputFileName,
    folder,
    file,
    reference,
    href,
    exists,
    folderExists,
    isReplaced: exists && shouldOutput,
    shouldOutput,
    strict: job.userInfo.strict ?? false,
    copy: job.userInfo.copy ?? false,
    version,
    changes: Object.fromEntries(changes),
  };
}

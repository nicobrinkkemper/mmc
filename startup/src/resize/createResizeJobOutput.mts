import path from "path";
import { fileStat, folderStat } from "../file/stat.mjs";
import { resizeTemplateParsers } from "./resizeTemplateParsers.mjs";
import { ResizeJob, ResizeJobInput } from "./types.mjs";

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
  const PUBLIC_URL = process.env.PUBLIC_URL ?? "";
  const REPLACE_PUBLIC_URL = PUBLIC_URL.endsWith("/")
    ? PUBLIC_URL
    : PUBLIC_URL + `/`;
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

  const shouldOutput =
    (file.includes("9mmc") || !exists || job.userInfo.strict) ?? false;
  if (file.includes("9mmc")) {
    console.log("file", file);
    console.log("exists", exists);
    console.log("shouldOutput", shouldOutput);
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

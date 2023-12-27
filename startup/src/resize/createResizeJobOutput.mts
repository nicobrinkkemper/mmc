import path from "path";
import { resizeTemplateParsers } from "./resizeTemplateParsers.mjs";
import { ResizeJob, ResizeJobInput } from "./types.mjs";
import { fileStat, folderStat } from "../file/stat.mjs";

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

  const href =
    (job.userInfo.href ?? "") +
    path.join(
      file.replace("public" + path.sep, `${process.env.PUBLIC_URL ?? ""}/`)
    ); // the file without the public folder is the href
  const version = job.userInfo.version ?? versionFromChanges(changes);

  const reference = job.userInfo.reference
    ? resizeTemplateParsers.snakecase(job) + job.userInfo.reference
    : resizeTemplateParsers.snakecase(job);
  const folder = path.parse(file).dir;
  const folderExists = await folderStat(folder);
  const exists = await fileStat(file);
  const shouldOutput = (!exists || job.userInfo.strict) ?? false;

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

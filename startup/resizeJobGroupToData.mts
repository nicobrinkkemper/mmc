import { ResizeOptions } from "sharp";
import { ResizeJob } from "./types.mjs";

type ImageJsonItem = {
  [key: string]: unknown;
} & ResizeOptions & {
    placeholder?: string;
  };
type ImageJsonStructure = Record<string, ImageJsonItem>;

function reduceResizeJobGroupToData(
  data: ImageJsonStructure,
  job: ResizeJob
): ImageJsonStructure {
  const {
    output: { reference, placeholder, href, version },
  } = job;
  const hasReference = data && reference in data;
  const fallbackVersion = version || "versions";
  const hasVersion =
    hasReference &&
    typeof data[reference] === "object" &&
    fallbackVersion in data[reference];

  const outputConditional: ImageJsonItem = {
    ...(hasReference && data[reference]),
    ...(placeholder && { placeholder }),
    ...(hasVersion
      ? {
          [fallbackVersion]: [
            ...(data[reference][fallbackVersion] as string[]),
            href,
          ],
        }
      : {
          [fallbackVersion]: [href],
          ...(placeholder && job.userInfo.resize),
        }),
  };
  return {
    ...data,
    [reference]: outputConditional,
  };
}

export function jobGroupToData(jobGroup: ResizeJob[]) {
  return jobGroup.reduce<ImageJsonStructure>(reduceResizeJobGroupToData, {});
}

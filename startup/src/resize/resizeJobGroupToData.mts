import { ResizeJob } from "./types.mjs";

export type ImageJsonStructure = Record<
  string,
  {
    width?: number;
    height?: number;
    placeholder?: string;
  }
>;
type ImageJsonItem = ImageJsonStructure[string];

/**
 * This function flattens all the resize jobs into a usable data structure for the frontend.
 *
 * reference = [snakecase]
 * version = [width]
 *
 * @example ```tsx
 * {
 *  theorymon: {
 *    "180": "/8mmc/level/theorymon-180.webp",  // fileName:"[snakecase]-[width].webp"
 *    width: 180,                               // placeholder:true or main:true
 *    height: 180,                              // placeholder:true or main:true
 *    placeholder: "data:image/png;base64,...." // placeholder:true
 * }
 * ... later
 * <PublicImage alt={level.levelName.name} {...level.images.levelThumbnail} />
 * ```
 */
function reduceResizeJobGroupToData(
  data: ImageJsonStructure,
  job: ResizeJob
  // index: number,
): ImageJsonStructure {
  const {
    userInfo: {
      placeholder: userRequestedPlaceholder,
      main: userRequestedMain = !!userRequestedPlaceholder, // indicating a placeholder is the same as indicating the main image
    },
    output: { reference, placeholder, href, version },
  } = job;
  const hasReference = data && reference in data;
  const fallbackVersion = version || "versions";
  const dataAtReference = data[reference];
  const hasVersion =
    hasReference &&
    typeof dataAtReference === "object" &&
    dataAtReference != null &&
    fallbackVersion in dataAtReference;
  if (job.userInfo?.resize?.height === 1) console.log("Warning height 1");
  const outputConditional: ImageJsonItem = {
    ...(hasReference && dataAtReference),
    ...(placeholder && { placeholder }),
    ...(hasVersion
      ? {
          [fallbackVersion]: [
            ...(dataAtReference[fallbackVersion as never] as string[]),
            href,
          ],
        }
      : {
          [fallbackVersion]: [href],
          ...(userRequestedMain && job.userInfo.resize), // the resize info is only added to the main image
        }),
  };
  return {
    ...data,
    [reference]: outputConditional,
  };
}

export function resizeJobGroupToData(jobGroup: ResizeJob[]) {
  return jobGroup.reduce<ImageJsonStructure>(reduceResizeJobGroupToData, {});
}

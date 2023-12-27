import { ResizeJobDone } from "./types.mjs";

export type ImageJsonStructure = Record<
  string,
  {
    width?: number;
    height?: number;
    aspectRatio?: string;
    srcSet?: string;
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
  job: ResizeJobDone
  // index: number,
): ImageJsonStructure {
  const {
    userInfo: { main: userRequestedMain },
    output: { reference, href, version },
    resized: { width, height, aspectRatio, placeholder },
  } = job;
  const hasReference = data && reference in data;
  const fallbackVersion = version || "versions";
  const dataAtReference = data[reference];
  const hasVersion =
    hasReference &&
    typeof dataAtReference === "object" &&
    dataAtReference != null &&
    fallbackVersion in dataAtReference;
  const prevSrcset = dataAtReference?.srcSet;
  const srcSet = buildSrcsetString(prevSrcset, { width, href });
  const outputConditional = {
    ...(hasReference && dataAtReference),
    ...(placeholder && { placeholder }),
    ...(srcSet && { srcSet }),
    ...(hasVersion
      ? {
          [fallbackVersion]: [
            ...(dataAtReference[fallbackVersion as never] as string[]),
            href,
          ],
        }
      : {
          [fallbackVersion]: [href],
          ...(userRequestedMain && {
            width,
            height,
            aspectRatio,
            src: href,
          }), // the resize info is only added to the main image
        }),
  };
  return {
    ...data,
    [reference]: outputConditional,
  };
}

function toSrcsetString({ width, href }: { width: number; href: string }) {
  return `${href} ${width}w`;
}

function buildSrcsetString(
  prevSrcset: unknown,
  { width, href }: { width: number; href: string }
) {
  const srcSet = toSrcsetString({ width, href });
  return typeof prevSrcset === "string" && prevSrcset !== ""
    ? `${prevSrcset}, ${srcSet}`
    : srcSet;
}

export function resizeJobGroupToData(jobGroup: ResizeJobDone[]) {
  return jobGroup.reduce<ImageJsonStructure>(reduceResizeJobGroupToData, {});
}

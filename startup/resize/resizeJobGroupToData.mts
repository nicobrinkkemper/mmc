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
    userInfo: { main },
    output: { reference, href, version },
    resized: { width, height, aspectRatio, placeholder },
  } = job;
  const hasReference = data && reference in data;
  const fallbackVersion = version || "versions";
  const prev = data[reference];
  const hasPrev = typeof prev === "object" && prev != null;
  const hasFallbackVersion = hasPrev && fallbackVersion in prev;
  const hasVersion = hasReference && hasFallbackVersion;

  const srcSet =
    (!prev?.srcSet ? "" : prev.srcSet + ", ") + href + " " + width + "w";

  return {
    ...data,
    [reference]: {
      ...(hasReference && prev),
      ...(placeholder && { placeholder }),
      ...(srcSet && { srcSet }),
      ...((hasVersion
        ? {
            [fallbackVersion]: [
              ...(prev[fallbackVersion as never] as string[]),
            ],
          }
        : {
            [fallbackVersion]: [href],
            ...((!prev?.width || main) && { width }),
            ...((!prev?.height || main) && { height }),
            ...((!prev?.aspectRatio || main) && { aspectRatio }),
            ...((!prev?.src || main) && { src: href }),
          }) as ImageJsonItem),
    },
  };
}

export function resizeJobGroupToData(jobGroup: ResizeJobDone[]) {
  return jobGroup.reduce<ImageJsonStructure>(reduceResizeJobGroupToData, {});
}
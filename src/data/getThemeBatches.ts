import { createTransformBatch } from "./createTransformBatch.js";
import { getThemePropsNextAndPrevBatch } from "./getThemePropsNextAndPrevBatch.js";

const addNextAndPrev = (
  batches: Omit<ThemeBatch, "nextAndPrev">[]
): ThemeBatch[] =>
  batches.map((batch, index) => ({
    ...batch,
    nextAndPrev: getThemePropsNextAndPrevBatch(batches as ThemeBatch[], index),
  }));

export function getThemeBatches({
  batches,
  pathInfo,
  weektrailers,
}: {
  weektrailers: string[];
  batches: Batch[];
  pathInfo: ThemePathInfo;
}): ThemeBatches {
  if (!batches?.length) throw new Error("No batches found");

  const transformBatch = createTransformBatch(pathInfo, weektrailers);
  const transformedBatches = batches.map(transformBatch);
  const mappedBatches = addNextAndPrev(transformedBatches);
  return {
    batches: mappedBatches,
    isUnreleased: mappedBatches[0].levels.some((level) => level.isUnreleased),
    startDate: new Date(batches[0].releaseDate.date),
  } as const;
}

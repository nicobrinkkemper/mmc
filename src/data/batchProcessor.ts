import { groupBy } from "lodash-es";
import { getThemePathInfo } from "./getThemePathInfo.js";

export const batchProcessor: ThemeBatchProcessorFn = (
  themeConfig,
  themeData
) => {
  // Group levels by batch
  const grouped = Object.values(groupBy(themeData, "batchNumber"));
  return grouped.map((levels, batchIndex) => {
    const path = `/${themeConfig.theme}/levels/${batchIndex}` as const;
    return {
      weekTrailer: themeConfig.weekTrailers[batchIndex],
      levels: levels,
      pathInfo: getThemePathInfo(path),
      releaseDate: levels[0].releaseDate,
    } as ThemeBatch<typeof path>;
  });
};

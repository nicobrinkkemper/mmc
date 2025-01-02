import { groupBy } from "lodash-es";

export const batchProcessor: ThemeBatchProcessorFn = (
  themeConfig,
  unbatchedLevelData,
  images
) => {
  const grouped = Object.values(groupBy(unbatchedLevelData, "batchNumber"));
  const batches = grouped.map((levels, batchIndex) => {
    const batchNumber = levels[0].batchNumber;
    const batchName = levels[0].batchName;
    const batchDescription = levels[0].batchDescription;
    const batch = images?.batch;
    const batchImage = batch?.[`batch_${batchNumber}` as keyof typeof batch];
    return {
      batchNumber: batchNumber,
      batchName: batchName ?? `Week ${batchNumber}`,
      batchDescription: batchDescription ?? ``,
      weekTrailer: themeConfig.weekTrailers[batchIndex],
      levels: levels,
      releaseDate: levels[0].releaseDate,
      image: batchImage ?? null,
    };
  });
  return {
    batches,
    releaseDate: batches[0].releaseDate,
  };
};

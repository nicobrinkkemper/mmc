import { createGetLevelInfo } from "./createGetLevelInfo.js";
import { getBatchPathInfo } from "./getBatchPathInfo.js";

export const createTransformBatch =
  (pathInfo: ThemePathInfo, weektrailers: string[]) =>
  (batch: Batch, index: number): Omit<ThemeBatch, "nextAndPrev"> => ({
    ...batch,
    weekTrailer: weektrailers[index],
    batchNumber: Number(batch.batchNumber),
    batchNumberIndex: index,
    levels: batch.levels.map(createGetLevelInfo(pathInfo)),
    pathInfo: getBatchPathInfo(pathInfo, batch),
  });

import { createGetLevelInfo } from "./createGetLevelInfo.js";
import { getBatchPathInfo } from "./getBatchPathInfo.js";
export const createTransformBatch = (pathInfo, weektrailers) => (batch, index) => ({
    ...batch,
    weekTrailer: weektrailers[index],
    batchNumber: Number(batch.batchNumber),
    batchNumberIndex: index,
    levels: batch.levels.map(createGetLevelInfo(pathInfo)),
    pathInfo: getBatchPathInfo(pathInfo, batch),
});
//# sourceMappingURL=createTransformBatch.js.map
import { themes } from "../config/themeConfig.js";
import { getStaticData } from "./getStaticData.js";

export const homePages = themes.map(
  (theme) =>
    getStaticData(`/${theme}`, {
      pathInfo: true,
      images: ["logo", "logo_special", "illustration"],
      adjacent: {
        pathInfo: ["to"],
        images: ["logo"],
      },
      clickable: true,
      info: true,
    }) satisfies Parameters<HomePageType>[0]
);

export const levelBatchesPages = themes.flatMap(
  (theme) =>
    getStaticData(`/${theme}/levels`, {
      pathInfo: true,
      images: ["logo"],
      levelData: true,
      adjacent: {
        pathInfo: ["to"],
        images: ["logo"],
      },
      clickable: true,
    }) satisfies Parameters<LevelBatchesPageType>[0]
);

export const leveBatchPages = levelBatchesPages.flatMap((levelBatchesPage) =>
  levelBatchesPage.levelData.batches.map(
    (batch) =>
      getStaticData(
        `/${levelBatchesPage.pathInfo.theme}/levels/${batch.pathInfo.params.batchNumber}`,
        {
          pathInfo: true,
          images: ["logo", "logo_simple"],
          batch: true,
          clickable: true,
        }
      ) satisfies Parameters<LevelBatchPageType>[0]
  )
);

export const levelPages = leveBatchPages.flatMap((batchPage) =>
  batchPage.batch.levels.map(
    (level) =>
      getStaticData(
        `/${batchPage.pathInfo.theme}/level/${batchPage.pathInfo.params.batchNumber}/${level.pathInfo.params.order}`,
        {
          pathInfo: true,
          images: ["logo", "logo_simple"],
          batch: true,
          level: true,
          clickable: true,
        }
      ) satisfies Parameters<LevelPageType>[0]
  )
);

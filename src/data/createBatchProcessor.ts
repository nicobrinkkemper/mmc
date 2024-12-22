import { getWeekTrailers } from "../config/getWeekTrailers.js";
import { getBatchPathInfo } from "./getBatchPathInfo.js";
import { getLevelPathInfo } from "./getLevelPathInfo.js";
import { getThemePropsNextAndPrevBatch } from "./getThemePropsNextAndPrevBatch.js";
import { getThemePropsNextAndPrevLevel } from "./getThemePropsNextAndPrevLevel.js";
import { safeSnakecase } from "./safeSnakecase.mjs";

/**
 * Processes raw level data into batches with next/prev navigation
 */
export function createBatchProcessor<
  T extends Theme,
  B extends NumberParam = NumberParam,
  O extends NumberParam = NumberParam
>(theme: T) {
  return (
    levels: Array<ThemeCsv>,
    images: ThemeImages<T>
  ): ThemeBatch<`/${T}/levels/${B}`, T, B>[] => {
    // Group levels by batch
    const batchMap = levels.reduce((acc, level) => {
      const { batchNumber } = level;
      if (!acc[batchNumber]) {
        acc[batchNumber] = [];
      }
      acc[batchNumber].push(level);
      return acc;
    }, {} as Record<string, typeof levels>);

    // First phase: Create basic batch structure
    const levelBatches = Object.entries(batchMap).map(
      ([batchNumber, levels], batchIndex) => {
        const mappedLevels = levels
          .sort((a, b) => Number(a.order) - Number(b.order))
          .map((level) => ({
            ...level,
            pathInfo: getLevelPathInfo<T, B, O>(
              `/${theme}/level/${batchNumber}/${level.order}` as `/${T}/level/${B}/${O}`
            ),
            releaseDate: {
              formatted: level.releaseDate,
              date: new Date(level.releaseDate),
              isUnreleased: Date.now() < new Date(level.releaseDate).getTime(),
            },
          }));

        return {
          weekTrailer: getWeekTrailers(theme)[batchIndex],
          levels: mappedLevels,
          pathInfo: getBatchPathInfo<T, B>(
            `/${theme}/levels/${batchNumber}` as `/${T}/levels/${B}`
          ),
          tags: levels.flatMap((l) => l.tags),
          releaseDate: levels[0].releaseDate,
        };
      }
    );

    // Second phase: Add navigation
    const levelBatchesWithNavigation = levelBatches.map(
      (batch, batchIndex): ThemeBatch<`/${T}/levels/${B}`, T, B> => {
        if (!batch) {
          throw new Error("Batch is undefined");
        }
        return {
          ...batch,
          releaseDate: batch.levels[0].releaseDate as {
            formatted: string;
            date: Date;
            isUnreleased: boolean;
          },
          levels: batch.levels.map((level) => {
            if (!level) {
              throw new Error("Undefined level");
            }
            if (!level.makerName) {
              console.log(level);
              throw new Error("Undefined makerName");
            }
            if (!level.levelName) {
              throw new Error("Undefined levelName");
            }
            const makerImageSlug = safeSnakecase(level.makerName);
            if (!(makerImageSlug in images.maker)) {
              console.log(images, batch.levels[0].makerName);
              throw new Error(
                `Maker image slug ${level.makerName}, ${makerImageSlug} not found in images`
              );
            }
            const levelImageSlug = safeSnakecase(level.levelName);
            console.log(Object.keys(images));
            if (!(levelImageSlug in images.level)) {
              throw new Error(
                `Level image slug ${level.levelName}, ${levelImageSlug} not found in images`
              );
            }
            if (!(levelImageSlug + "_thumbnail" in images.level)) {
              throw new Error(
                `Level thumbnail slug ${level.levelName}, ${levelImageSlug} not found in images`
              );
            }
            return {
              ...level,
              levelName: {
                slug: levelImageSlug,
                name: level.levelName,
              },
              makerName: {
                slug: makerImageSlug,
                name: level.makerName,
              },
              images: {
                level: images[levelImageSlug],
                maker: images[makerImageSlug],
                levelThumbnail: images[levelImageSlug + "_thumbnail"],
              },
              nextAndPrev: getThemePropsNextAndPrevLevel<T, B, O>(
                batch.levels,
                batch.levels.findIndex(
                  (l) => l.pathInfo.params.order === level.pathInfo.params.order
                )
              ),
            };
          }),
          nextAndPrev: getThemePropsNextAndPrevBatch(levelBatches, batchIndex),
        };
      }
    );

    return levelBatchesWithNavigation as unknown as Array<
      ThemeBatch<`/${T}/levels/${B}`, T, B>
    >;
  };
}

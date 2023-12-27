import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "./useTheme";

const isValidNumberParam = (str: unknown, max: number) => {
  const n = Number(str);
  return !isNaN(n) && n > 0 && n <= max;
};

export function useThemeLevelData() {
  const { theme, data } = useTheme();
  const { batches, weektrailers } = data;
  let { batchNumber, order } =
    useParams<Record<"batchNumber" | "order", string | undefined>>();

  return useMemo(() => {
    if (!isValidNumberParam(batchNumber, batches.length)) {
      return {
        hasLevel: false,
        hasBatch: false,
      } as const;
    }
    const batchNumberParam = batchNumber;
    const batchIndex = Number(batchNumber) - 1;
    const batch = batches[batchIndex];
    const weekTrailer = weektrailers[batchIndex];
    if (!batch) throw new Error(`No batch found for ${batchNumberParam}`);
    const batchInfo = {
      batchNumberParam,
      batchNumber: batchIndex + 1,
      batchIndex,
      batch,
      hasBatch: true,
      weekTrailer,
    } as const;
    if (!isValidNumberParam(order, batch.levels.length)) {
      return {
        ...batchInfo,
        hasLevel: false,
      } as const;
    }

    const orderParam = order;
    const orderIndex = Number(order) - 1;
    const level = batch.levels[orderIndex];
    if (!level) throw new Error(`No level found for ${batchNumberParam}`);
    const hasPreviousLevel = orderIndex > 0;
    const hasNextLevel = orderIndex < batch.levels.length - 1;
    const lastWeek = new Date("last week");
    const isNew = batch.levels.find(
      (level) => new Date(level.releaseDate.date) > lastWeek
    );
    const isUnreleased = new Date(batch.releaseDate.date) > new Date();
    const prevLevelSlug = hasPreviousLevel
      ? `/${theme}/level/${batchNumber}/${orderIndex}/`
      : undefined;

    const nextLevelSlug = hasNextLevel
      ? `/${theme}/level/${batchNumber}/${orderIndex + 2}/`
      : undefined;

    return {
      ...batchInfo,
      orderParam,
      order: orderIndex + 1,
      orderIndex,
      level,
      hasLevel: true,
      hasPreviousLevel,
      hasNextLevel,
      isNew,
      isUnreleased,
      prevLevelSlug,
      nextLevelSlug,
    } as const;
  }, [theme, batchNumber, order, batches, weektrailers]);
}

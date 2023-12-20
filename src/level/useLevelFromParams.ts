import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../theme/useTheme";

export function useLevelFromParams() {
  const {
    data: { batches },
  } = useTheme();
  const { batchNumber = "1", order = "1" } =
    useParams<Record<"batchNumber" | "order", string | undefined>>();

  return useMemo(() => {
    const batchIndex =
      !isNaN(Number(batchNumber)) && Number(batchNumber) - 1 in batches
        ? Number(batchNumber) - 1
        : 0;
    const batch = batches[batchIndex];

    const orderIndex =
      !isNaN(Number(order)) && Number(order) - 1 in batch.levels
        ? Number(order) - 1
        : 0;
    const level = batch.levels[orderIndex];

    return {
      batchNumber: batchIndex + 1,
      order: orderIndex + 1,
      orderIndex,
      batchIndex,
      batch,
      level,
    };
  }, [batchNumber, order, batches]);
}

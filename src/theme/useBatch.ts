import { useThemeLevelData } from "./useThemeLevelData";

export function useBatch() {
  const themeLevelData = useThemeLevelData();
  if (!themeLevelData.hasBatch) {
    console.log(themeLevelData);
    throw new Error("No batch found");
  }
  return themeLevelData;
}

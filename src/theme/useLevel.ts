import { useThemeLevelData } from "./useThemeLevelData";

export function useLevel() {
  const themeLevelData = useThemeLevelData();
  if (!themeLevelData.hasLevel) throw new Error("No level found");
  return themeLevelData;
}

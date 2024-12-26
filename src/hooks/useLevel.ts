import { createContext, useContext } from "react";

export const LevelContext = createContext<
  ThemeLevel<`/${Theme}/level/${NumberParam}/${NumberParam}`> | undefined
>(undefined);
export const SelectedLevelIndexContext = createContext<number | undefined>(
  undefined
);

export function useLevel() {
  const level = useContext(LevelContext);
  if (!level) {
    throw new Error("useLevel must be used within a LevelContext.Provider");
  }
  return level;
}

export function useSelectedLevelIndex() {
  const levelIndex = useContext(SelectedLevelIndexContext);
  if (!levelIndex) {
    throw new Error(
      "useSelectedLevelIndex must be used within a SelectedLevelIndexContext.Provider"
    );
  }
  return levelIndex;
}

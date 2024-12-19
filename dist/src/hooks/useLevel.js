import { createContext, useContext, useMemo } from "react";
import { getThemePropsNextAndPrevLevel } from "../data/getThemePropsNextAndPrevLevel.js";
import { useBatch } from "./useBatch.js";
export const LevelContext = createContext(undefined);
export const SelectedLevelIndexContext = createContext(undefined);
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
        throw new Error("useSelectedLevelIndex must be used within a SelectedLevelIndexContext.Provider");
    }
    return levelIndex;
}
export function useNextAndPrevLevel(levelOrder) {
    const batch = useBatch();
    const nextAndPrevLevel = useMemo(() => {
        return getThemePropsNextAndPrevLevel(batch.levels, levelOrder);
    }, [levelOrder, batch]);
    return nextAndPrevLevel;
}
//# sourceMappingURL=useLevel.js.map
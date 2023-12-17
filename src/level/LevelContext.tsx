import { createContext } from "react";
import { useLevelData } from "../useLevelData";


export type LevelContextType = {
    levelData: ReturnType<typeof useLevelData>;
}

export const LevelContext = createContext({} as LevelContextType);
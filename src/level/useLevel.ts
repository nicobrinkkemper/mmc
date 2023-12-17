import { useContext } from "react";
import { LevelContext} from "./LevelContext";

export function useLevel() {
    return useContext(LevelContext);
}
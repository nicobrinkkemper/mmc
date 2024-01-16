import { useContext } from "react";
import { ThemeDataContext } from "./ThemeDataContext";

export function useThemeData() {
  return useContext(ThemeDataContext);
}

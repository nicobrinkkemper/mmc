import { createContext } from "react";
import { Theme, Themes } from "./types";

export type ThemeDataContextType = {
  themes: Themes;
  themesTotal: number;
  themeKeys: Theme[];
};

export const ThemeDataContext = createContext<ThemeDataContextType>(
  {} as ThemeDataContextType
);

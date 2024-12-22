"use client";
import { useLocation } from "@tanstack/react-router";
import { createContext, useContext, useMemo } from "react";
import { mainTheme } from "../config/themeConfig.js";
import { getStaticData } from "../data/getStaticData.js";

export const ThemeContext = createContext<ThemeBaseProps>({} as ThemeBaseProps);
export const SelectedThemeContext = createContext<Theme>(mainTheme);

export function useSelectedTheme() {
  const theme = useContext(SelectedThemeContext);
  if (!theme) {
    throw new Error(
      "useSelectedTheme must be used within a SelectedThemeContext.Provider"
    );
  }
  return theme;
}

export const useTheme = () => {
  const pathname = useLocation().pathname;
  const props = useMemo(() => getStaticData(pathname), [pathname]);
  return props;
};

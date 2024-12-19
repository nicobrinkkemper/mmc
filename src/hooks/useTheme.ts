"use client";
import { createContext, useContext, useMemo } from "react";
import { mainTheme } from "../config/constants.js";
import { getThemeProps } from "../data/getThemeProps.js";

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

export const useTheme = ((options) => {
  const theme = useSelectedTheme();
  if (!theme) {
    throw new Error("useTheme must be used within a ThemeContext.Provider");
  }
  const props = useMemo(() => getThemeProps(theme, options), [theme, options]);
  return props;
}) as UseThemeFn;

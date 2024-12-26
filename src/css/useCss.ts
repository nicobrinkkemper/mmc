import { useMemo } from "react";
import { useTheme } from "../hooks/useTheme.js";
import { getCss } from "./getCss.js";
import * as themesCss from "./index.js";

export function useCss<
  K extends keyof (typeof themesCss)[keyof typeof themesCss]
>(className: K): string {
  const theme = useTheme();
  if (!theme || !theme.pathInfo || !("theme" in theme.pathInfo)) {
    throw new Error("Theme not found");
  }
  const t = theme.pathInfo.theme;
  return useMemo(() => {
    return getCss(t, className);
  }, [t, className]);
}

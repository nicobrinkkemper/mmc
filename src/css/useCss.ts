import { useTheme } from "../hooks/useTheme.js";
import { getCss } from "./getCss.js";
import * as themesCss from "./index.js";

export function useCss<
  K extends keyof (typeof themesCss)[keyof typeof themesCss]
>(className: K): string {
  return getCss(useTheme().theme, className);
}

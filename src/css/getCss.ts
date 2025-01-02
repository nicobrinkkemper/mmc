import { mainTheme } from "../config/themeConfig.js";
import * as themesCss from "./index.js";

export function getCss<
  K extends keyof (typeof themesCss)[keyof typeof themesCss]
>(theme: Theme, className: K) {
  const key = `_${theme}`;
  const fallback = (
    key in themesCss ? key : `_${mainTheme}`
  ) as keyof typeof themesCss;
  return themesCss[fallback][className];
}

import { mainTheme } from "../config/themeConfig.js";
import * as themesCss from "./index.js";

type WhiteLabelClasses = keyof (typeof themesCss)[keyof typeof themesCss];

type Return<K extends WhiteLabelClasses | undefined = undefined> =
  K extends WhiteLabelClasses
    ? (typeof themesCss)[keyof typeof themesCss][K]
    : K extends undefined
    ? (typeof themesCss)[keyof typeof themesCss]
    : never;

export function getCss<K extends WhiteLabelClasses | undefined = undefined>(
  theme: Theme,
  className?: K
): Return<K> {
  const key = `_${theme}`;
  const fallback = (
    key in themesCss ? key : `_${mainTheme}`
  ) as keyof typeof themesCss;
  if (className) {
    return themesCss[fallback][className as never] as Return<K>;
  }
  return themesCss[fallback] as Return<K>;
}

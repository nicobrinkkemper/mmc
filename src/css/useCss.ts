import { useTheme } from "../theme/useTheme";
import type { ThemeCssClassName } from "./types";
import * as themesCss from "./index";

export function useCss<ClassName extends ThemeCssClassName>(
  className: ClassName
) {
  const key = `_${useTheme().theme}`;
  const fallback = (key in themesCss ? key : "_8mmc") as keyof typeof themesCss;
  return themesCss[fallback][className];
}

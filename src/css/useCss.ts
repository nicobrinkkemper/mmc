import { useTheme } from "../theme/useTheme";
import type { ThemeCssClassName } from "./types";
import * as themesCss from "./index";

export function useCss<ClassName extends ThemeCssClassName>(
  className: ClassName
) {
  return themesCss[`_${useTheme().theme}`][className];
}

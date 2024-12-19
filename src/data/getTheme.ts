import { mainTheme } from "../config/constants.js";
import themes from "./themes.json" with { type: "json" };

export function getTheme<S extends ThemeConfigTheme = ThemeConfigTheme>(theme: S | string): Themes[S] {
  if (!(theme in themes)) {
    return themes[mainTheme] as typeof themes[S] 
  }
  return themes[theme as S] as typeof themes[S] 
}

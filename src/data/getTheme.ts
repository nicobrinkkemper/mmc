import { isValidTheme } from "./isValidTheme.js";
import themes from "./themes.json" with { type: "json" };

export function getTheme<S extends ThemeConfigTheme = ThemeConfigTheme>(theme: S | string): Themes[S] {
  if (!isValidTheme(theme)) {
    throw new Error(`Invalid theme: ${theme}`);
  }
  return themes[theme as S] as typeof themes[S] 
}

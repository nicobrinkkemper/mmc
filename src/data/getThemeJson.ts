import type { ThemeKeys } from "./types";
import ThemeJson from "./themes.json";
export function getThemeJson() {
  const themes = ThemeJson;
  const themeKeys = Object.keys(themes) as ThemeKeys;
  const themesTotal = themeKeys.length;
  return {
    themes,
    themeKeys,
    themesTotal,
  } as const;
}

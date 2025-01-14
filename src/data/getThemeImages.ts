import { isValidTheme, mainTheme } from "../config/themeConfig.js";

export function getThemeImages<T extends Theme = Theme>(theme: T | string) {
  if (isValidTheme(theme)) {
    theme = mainTheme;
  }
  return import(`./generated/${theme}.images.json`);
}

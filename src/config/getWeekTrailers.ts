import { themeConfig } from "./constants.js";

/**
 * Returns the week trailers for a given theme
 */
export function getWeekTrailers<T extends ThemeConfigTheme = MainTheme>(
  theme: T | string
): (typeof themeConfig)[`_${T}`]["weektrailers"] {
  if (!(`_${theme}` in themeConfig)) {
    console.error(`Theme weektrailer \`${theme}\` not found`);
    return [];
  }
  return themeConfig[`_${theme as T}`].weektrailers;
}

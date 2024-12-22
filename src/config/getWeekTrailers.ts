import { themeConfig } from "./themeConfig.js";

/**
 * Returns the week trailers for a given theme
 */
export function getWeekTrailers<T extends Theme = Theme>(
  theme: T | string
): (typeof themeConfig)[`_${T}`]["weekTrailers"] {
  if (!(`_${theme}` in themeConfig)) {
    console.error(`Theme weektrailer \`${theme}\` not found`);
    return [];
  }
  return themeConfig[`_${theme as T}`].weekTrailers;
}

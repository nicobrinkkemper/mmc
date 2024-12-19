import { themeConfig } from "./constants.js";
/**
 * Returns the week trailers for a given theme
 */
export declare function getWeekTrailers<T extends ThemeConfigTheme = MainTheme>(theme: T | string): (typeof themeConfig)[`_${T}`]["weektrailers"];
//# sourceMappingURL=getWeekTrailers.d.ts.map
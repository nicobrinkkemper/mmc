import { getWeekTrailers } from "../config/getWeekTrailers.js";
import { getTheme } from "./getTheme.js";
import { getThemeBatches } from "./getThemeBatches.js";
import { getThemeInfo } from "./getThemeInfo.js";
import { getThemePathInfo } from "./getThemePathInfo.js";
import { getThemePropsNextAndPrev } from "./getThemePropsNextAndPrev.js";
import { isValidTheme } from "./isValidTheme.js";
export const getStaticData = (theme, path) => {
    if (!isValidTheme(theme)) {
        throw new Error(`Invalid theme: ${theme}`);
    }
    const pathInfo = getThemePathInfo(theme, path);
    const { images, batches: batchesJson } = getTheme(theme);
    const info = getThemeInfo(theme);
    const weektrailers = getWeekTrailers(theme);
    const { batches, isUnreleased, startDate } = getThemeBatches({
        weektrailers: weektrailers,
        batches: batchesJson,
        pathInfo,
    });
    let clickable = "a";
    return {
        theme,
        pathInfo,
        info,
        images,
        batches,
        isUnreleased,
        weektrailers,
        startDate,
        nextAndPrevTheme: getThemePropsNextAndPrev(theme),
        clickable,
    };
};
//# sourceMappingURL=getStaticData.js.map
import { themeKeysNoPrefix } from "../config/config.js";
import { getTheme } from "./getTheme.js";
import { getThemeInfo } from "./getThemeInfo.js";
import { getThemePathInfo } from "./getThemePathInfo.js";
const getThemeNavigation = (current, offset) => {
    const currentIndex = themeKeysNoPrefix.indexOf(current);
    if (currentIndex === -1) {
        throw new Error(`No theme found for ${current}`);
    }
    const targetTheme = themeKeysNoPrefix[currentIndex + offset];
    const hasTheme = targetTheme !== undefined;
    if (!hasTheme) {
        return { exists: false };
    }
    const images = getTheme(targetTheme).images;
    const info = getThemeInfo(targetTheme);
    const pathInfo = getThemePathInfo(targetTheme, `/${targetTheme}`);
    return {
        exists: true,
        theme: {
            theme: targetTheme,
            images,
            info,
            pathInfo,
        },
    };
};
export function getThemePropsNextAndPrev(currentTheme) {
    return {
        nextTheme: getThemeNavigation(currentTheme, 1),
        prevTheme: getThemeNavigation(currentTheme, -1),
    };
}
//# sourceMappingURL=getThemePropsNextAndPrev.js.map
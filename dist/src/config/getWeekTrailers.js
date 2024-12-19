import { themeConfig } from "./constants.js";
/**
 * Returns the week trailers for a given theme
 */
export function getWeekTrailers(theme) {
    if (!(`_${theme}` in themeConfig)) {
        console.error(`Theme weektrailer \`${theme}\` not found`);
        return [];
    }
    return themeConfig[`_${theme}`].weektrailers;
}
//# sourceMappingURL=getWeekTrailers.js.map
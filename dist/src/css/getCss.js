import { mainTheme } from "../config/constants.js";
import * as themesCss from "./index.js";
export function getCss(theme, className) {
    const key = `_${theme}`;
    const fallback = (key in themesCss ? key : `_${mainTheme}`);
    return themesCss[fallback][className];
}
//# sourceMappingURL=getCss.js.map
import { mainTheme } from "../config/constants.js";
import themes from "./themes.json" with { type: "json" };
export function getTheme(theme) {
    if (!(theme in themes)) {
        return themes[mainTheme];
    }
    return themes[theme];
}
//# sourceMappingURL=getTheme.js.map
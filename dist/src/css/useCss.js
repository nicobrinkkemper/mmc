import { useTheme } from "../hooks/useTheme.js";
import { getCss } from "./getCss.js";
export function useCss(className) {
    return getCss(useTheme().theme, className);
}
//# sourceMappingURL=useCss.js.map
import { useMemo } from "react";
import { useTheme } from "../hooks/useTheme.js";
import { getContent } from "./getContent.js";
export function useContent(key) {
    const theme = useTheme().theme;
    return useMemo(() => getContent(theme, key), [theme, key]);
}
//# sourceMappingURL=useContent.js.map
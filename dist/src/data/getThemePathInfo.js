import { analyzePath } from "./analysePath.js";
export const getThemePathInfo = (theme, path) => {
    const analysis = analyzePath(theme, path);
    return {
        themeSlug: `/${theme}`,
        toLevels: `/${theme}/levels`,
        toCredits: `/${theme}/credits`,
        path: analysis.to,
        ...analysis,
    };
};
//# sourceMappingURL=getThemePathInfo.js.map
import { analyzePath } from "./analysePath.js";

export const getThemePathInfo = <T extends Theme, Path extends string>(
  theme: T,
  path: Path
): ThemePathInfo<T, Path> => {
  const analysis = analyzePath(theme, path);
  return {
    themeSlug: `/${theme}`,
    toLevels: `/${theme}/levels`,
    toCredits: `/${theme}/credits`,
    path: analysis.to,
    ...analysis,
  } as ThemePathInfo<T, Path>;
};

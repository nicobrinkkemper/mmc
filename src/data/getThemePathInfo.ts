import { analyzePath } from "./analysePath.js";
import { isValidPath } from "./isValidPath.js";

export const getThemePathInfo = <Path extends ValidPath>(
  path: Path | string
): ThemePathInfo<Path> => {
  isValidPath(path);
  const analysis = analyzePath(path);
  return {
    themeSlug: `/${analysis.theme}`,
    toLevels: `/${analysis.theme}/levels`,
    toCredits: `/${analysis.theme}/credits`,
    path: path,
    ...analysis,
  } as ThemePathInfo<Path>;
};

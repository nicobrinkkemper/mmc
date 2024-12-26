import { analyzePath } from "./analysePath.js";
import { isValidPath } from "./isValidPath.js";

export const getThemePathInfo = <P extends ValidPath>(
  path: P
): ThemePathInfo<P> => {
  isValidPath(path);
  const { theme, segments, params, to } = analyzePath(path);
  return {
    toHome: `/${theme}`,
    toLevels: `/${theme}/levels`,
    toCredits: `/${theme}/credits`,
    path: path,
    to,
    theme,
    segments,
    params,
  } as ThemePathInfo<P>;
};

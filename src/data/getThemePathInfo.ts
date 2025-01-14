import { createPathInfo } from "./createPathInfo.js";
import { getRoute } from "./getRoute.js";

/**
 * Given any url it will return the full path info object
 */
export const getThemePathInfo = (anyPath: string) =>
  createPathInfo(getRoute(anyPath)) as ThemePathInfo<ValidRoute, ValidPath>;

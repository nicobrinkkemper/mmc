import { createPathInfo } from "./createPathInfo.js";
import { getRoute } from "./getRoute.js";

/**
 * Given any url it will return the full path info object
 */
export const getThemePathInfo = <P extends string>(anyPath: P) =>
  createPathInfo(getRoute(anyPath));

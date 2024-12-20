import { themeKeysNoPrefix } from "../config/config.js";

export function isValidPath<const P extends string>(
  path: P | string
): asserts path is ValidPath {
  if (path === "/" || path === "/404" ) {
    return
  }
  const theme = path.split("/")[1];
  if (!themeKeysNoPrefix.includes(theme as Theme)) { 
    throw new Error(`Invalid path: ${path}`);
  }
}

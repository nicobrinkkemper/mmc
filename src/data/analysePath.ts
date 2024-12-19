import { themeKeysNoPrefix } from "../config/config.js";

export const analyzePath = (theme: Theme | undefined, path: string) => {
  const cleanPath = path.replace(/\/+/g, "/").replace(/\/$/, "");
  const segments = cleanPath.split("/").filter(Boolean);

  const baseResult = {
    isHome: false,
    isBatches: false,
    isBatch: false,
    isLevel: false,
    isCredits: false,
    isNotFound: false,
    params: undefined as
      | { batchNumber: string; levelNumber?: string }
      | undefined,
  };

  // Special cases
  if (segments[0] === "404") {
    return { ...baseResult, isNotFound: true, to: "/404" };
  }

  // Root path
  if (segments.length === 0) return { ...baseResult, isHome: true, to: "/" };

  // First segment must be a theme
  const pathTheme = segments[0] as Theme;
  if (!themeKeysNoPrefix.includes(pathTheme)) {
    throw new Error(`Invalid theme in path: ${segments[0]}`);
  }

  // If theme is provided, it must match path theme
  if (theme && theme !== pathTheme) {
    throw new Error(
      `Theme mismatch: expected ${theme}, got ${pathTheme} in path`
    );
  }

  theme = pathTheme;

  switch (segments[1]) {
    case "levels":
      if (segments.length === 2) {
        return { ...baseResult, isBatches: true, to: `/${theme}/levels` };
      }
      if (segments.length === 3) {
        return {
          ...baseResult,
          isBatch: true,
          to: `/${theme}/levels/${segments[2]}`,
          params: { batchNumber: segments[2] },
        };
      }
      throw new Error("Invalid levels path");
    case "level":
      if (segments.length === 3) {
        return {
          ...baseResult,
          isBatch: true,
          to: `/${theme}/level/${segments[2]}`,
          params: { batchNumber: segments[2] },
        };
      }
      if (segments.length === 4) {
        return {
          ...baseResult,
          isLevel: true,
          to: `/${theme}/level/${segments[2]}/${segments[3]}`,
          params: { batchNumber: segments[2], levelNumber: segments[3] },
        };
      }
      throw new Error("Invalid level path");
    case "credits":
      if (segments.length !== 2) throw new Error("Invalid credits path");
      return { ...baseResult, isCredits: true, to: `/${theme}/credits` };
    case undefined:
      return { ...baseResult, isHome: true, to: `/${theme}` };
    default:
      throw new Error(`Invalid path segment: ${segments[1]}`);
  }
};

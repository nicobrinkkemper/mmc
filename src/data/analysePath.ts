import { themeKeysNoPrefix } from "../config/config.js";
import { mainTheme } from "../config/constants.js";

/**
 * Type safe analysis of the path. This is a test aswell as a functional router that handles
 * all possible paths. If you want to add a new path, you must add it here and add it as a ValidPathReturn
 * just cnrl+click on the type and it will take you to the definition.
 */
export const analyzePath = <
  A extends Theme | "404",
  B extends "levels" | "level" | "credits",
  C extends NumberParam,
  D extends NumberParam
>(
  path:
    | `/${A}/${B}/${C}/${D}`
    | `/${A}/${B}/${C}`
    | `/${A}/${B}`
    | `/${A}`
    | `/`
) => {
  // cleanPath removes duplicate slashes and trailing slash
  const cleanPath = path.replace(/\/+/g, "/").replace(/\/$/, "");
  const segments = cleanPath.split("/").filter(Boolean);

  // Root path
  if (segments.length === 0)
    return {
      isHome: true,
      isMainTheme: true,
      to: "/",
      theme: mainTheme,
      params: {
        order: undefined,
        batchNumber: undefined,
      },
    } as Pick<ThemePathInfo<"/">, "isHome" | "isMainTheme" | "to" | "theme">;

  // Special cases
  if (segments[0] === "404") {
    return {
      isNotFound: true,
      isMainTheme: true,
      to: "/404",
      theme: mainTheme,
      params: {
        order: undefined,
        batchNumber: undefined,
      },
    } satisfies Pick<
      ThemePathInfo<"/404">,
      "theme" | "isMainTheme" | "isNotFound" | "to" | "params"
    >;
  }

  // First segment must be a theme
  const theme = segments[0] as Theme;
  if (!themeKeysNoPrefix.includes(theme)) {
    throw new Error(`Invalid theme in path: ${segments[0]}`);
  }

  switch (segments[1]) {
    case "levels":
      if (segments.length === 2) {
        return {
          theme,
          isMainTheme: theme === mainTheme,
          isBatches: true,
          to: `/${theme}/levels`,
          params: {
            order: undefined,
            batchNumber: undefined,
          },
        } satisfies Pick<
          ThemePathInfo<`/${Theme}/levels`>,
          "theme" | "isMainTheme" | "params" | "isBatches" | "to"
        >;
      }
      if (segments.length === 3) {
        return {
          theme,
          isMainTheme: theme === mainTheme,
          to: `/${theme}/levels/${segments[2]}`,
          params: { batchNumber: segments[2], order: undefined },
          isBatch: true,
        } satisfies Pick<
          ThemePathInfo<`/${Theme}/levels/${NumberParam}`>,
          "theme" | "isMainTheme" | "params" | "isBatch" | "to"
        >;
      }
      throw new Error("Invalid levels path");
    case "level":
      if (segments.length === 4) {
        return {
          theme,
          isMainTheme: theme === mainTheme,
          isLevel: true,
          to: `/${theme}/level/${segments[2]}/${segments[3]}`,
          params: {
            batchNumber: segments[2],
            order: segments[3],
          },
        } satisfies Pick<
          ThemePathInfo<`/${Theme}/level/${NumberParam}/${NumberParam}`>,
          "theme" | "isMainTheme" | "isLevel" | "to" | "params"
        >;
      }
      throw new Error("Invalid level path");
    case "credits":
      if (segments.length !== 2) throw new Error("Invalid credits path");
      return {
        theme,
        isMainTheme: theme === mainTheme,
        isCredits: true,
        to: `/${theme}/credits`,
        params: {
          order: undefined,
          batchNumber: undefined,
        },
      } satisfies Pick<
        ThemePathInfo<`/${Theme}/credits`>,
        "theme" | "isMainTheme" | "isCredits" | "to" | "params"
      >;
    case undefined:
      return {
        theme: mainTheme,
        isMainTheme: true,
        isHome: true,
        to: `/`,
        params: {
          order: undefined,
          batchNumber: undefined,
        },
      } satisfies Pick<
        ThemePathInfo<`/`>,
        "theme" | "isMainTheme" | "isHome" | "to" | "params"
      >;
    default:
      throw new Error(`Invalid path segment: ${segments[1]}`);
  }
};

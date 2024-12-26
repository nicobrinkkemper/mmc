import { mainTheme, themes } from "../config/themeConfig.js";

/**
 * Type safe analysis of the path. This is a test aswell as a functional router that handles
 * all possible paths. If you want to add a new path, you must add it here and add it as a ValidPathReturn
 * just cnrl+click on the type and it will take you to the definition.
 */
export const analyzePath = <P extends ValidPath>(path: P | string) => {
  const cleanPath = path.replace(/\/+/g, "/").replace(/\/$/, "");
  const segments = cleanPath.split("/").filter(Boolean);

  // Root path
  if (segments.length === 0)
    return {
      to: `/`,
      theme: mainTheme,
      segments: [],
      params: {
        order: undefined,
        batchNumber: undefined,
      },
    } satisfies Pick<
      ThemePathInfo<`/`, [], MainTheme>,
      "to" | "theme" | "params" | "segments"
    >;

  // First segment must be a theme
  const theme = segments[0] as Theme;
  if (!themes.includes(theme)) {
    throw new Error(`Invalid theme in path: ${segments[0]}`);
  }

  switch (segments[1]) {
    case "levels":
      if (segments.length === 2) {
        return {
          theme,
          to: `/${theme}/levels`,
          segments: [theme, "levels"],
          path,
          params: {
            order: undefined,
            batchNumber: undefined,
          },
        } satisfies Pick<
          ThemePathInfo<`/${Theme}/levels`>,
          "theme" | "params" | "to" | "segments" | "path"
        >;
      }
      if (segments.length === 3) {
        return {
          theme,
          to: `/${theme}/levels/${segments[2]}`,
          segments: [theme, "levels", segments[2]],
          path,
          params: { batchNumber: segments[2] },
        } satisfies Pick<
          ThemePathInfo<`/${Theme}/levels/${NumberParam}`>,
          "theme" | "params" | "to" | "segments" | "path"
        >;
      }
      throw new Error("Invalid levels path");
    case "level":
      if (segments.length === 4) {
        return {
          theme,
          to: `/${theme}/level/${segments[2]}/${segments[3]}`,
          segments: [theme, "level", segments[2], segments[3]],
          path,
          params: {
            batchNumber: segments[2],
            order: segments[3],
          },
        } satisfies Pick<
          ThemePathInfo<`/${Theme}/level/${NumberParam}/${NumberParam}`>,
          "theme" | "to" | "params" | "segments" | "path"
        >;
      }
      throw new Error("Invalid level path");
    case "credits":
      if (segments.length !== 2) throw new Error("Invalid credits path");
      return {
        theme,
        to: `/${theme}/credits`,
        path,
        segments: [theme, "credits"],
        params: {
          order: undefined,
          batchNumber: undefined,
        },
      } satisfies Pick<
        ThemePathInfo<`/${Theme}/credits`>,
        "theme" | "to" | "params" | "segments" | "path"
      >;
    case undefined:
      return {
        theme: mainTheme,
        to: `/${mainTheme}`,
        path,
        segments: [mainTheme],
        params: {
          order: undefined,
          batchNumber: undefined,
        },
      } satisfies Pick<
        ThemePathInfo<`/${MainTheme}`>,
        "theme" | "to" | "params" | "segments" | "path"
      >;
    default:
      throw new Error(`Invalid path segment: ${segments[1]}`);
  }
};

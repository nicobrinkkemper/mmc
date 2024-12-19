import { getWeekTrailers } from "../config/getWeekTrailers.js";
import { getTheme } from "./getTheme.js";
import { getThemeBatches } from "./getThemeBatches.js";
import { getThemeInfo } from "./getThemeInfo.js";
import { getThemePathInfo } from "./getThemePathInfo.js";
import { getThemePropsNextAndPrev } from "./getThemePropsNextAndPrev.js";
import { isValidTheme } from "./isValidTheme.js";

export const getStaticData = (theme: Theme, path: string) => {
  if (!isValidTheme(theme)) {
    throw new Error(`Invalid theme: ${theme}`);
  }
  const pathInfo = getThemePathInfo(theme, path);
  const themeData = getTheme(theme);
  const batchesJson =
    "batches" in themeData ? themeData.batches : ({} as never);
  const images = "images" in themeData ? themeData.images : ({} as never);
  const info = getThemeInfo(theme);
  const weektrailers = getWeekTrailers(theme);
  const { batches, isUnreleased, startDate } = getThemeBatches({
    weektrailers: weektrailers,
    batches: batchesJson,
    pathInfo,
  });
  let clickable: React.ElementType | "a" | "button" = "a";

  return {
    theme,
    pathInfo,
    info,
    images,
    batches,
    isUnreleased,
    weektrailers,
    startDate,
    nextAndPrevTheme: getThemePropsNextAndPrev(theme),
    clickable,
  };
};
/**
 * The output of this is automatically used to create the ThemeStaticData
 * which is used to create the routes.
 */
export type GetStaticDataReturn = ReturnType<typeof getStaticData>;

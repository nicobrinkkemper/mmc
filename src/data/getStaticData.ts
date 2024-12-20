import { getWeekTrailers } from "../config/getWeekTrailers.js";
import { getTheme } from "./getTheme.js";
import { getThemeBatches } from "./getThemeBatches.js";
import { getThemeInfo } from "./getThemeInfo.js";
import { getThemePathInfo } from "./getThemePathInfo.js";
import { getThemePropsNextAndPrev } from "./getThemePropsNextAndPrev.js";
import { isValidPath } from "./isValidPath.js";

export const getStaticData = <P extends ValidPath = ValidPath>(
  path: P | string = "/"
): ThemeStaticData<P> => {
  isValidPath(path);
  const pathInfo = getThemePathInfo(path);
  const theme = pathInfo.theme;

  const themeData = getTheme(theme);
  const batchesJson =
    "batches" in themeData ? themeData.batches : ({} as never);
  const images = "images" in themeData ? themeData.images : ({} as never);
  const info = getThemeInfo(theme);
  const weektrailers = getWeekTrailers(theme);
  const batches = getThemeBatches({
    weektrailers: weektrailers,
    batches: batchesJson,
    pathInfo,
  });
  let clickable: React.ElementType | "a" | "button" = "a";
  const batch =
    typeof pathInfo.params.batchNumber === "number" && pathInfo.isBatch
      ? batches.batches.find(
          (batch) => batch.batchNumber === pathInfo.params.batchNumber
        )
      : undefined;

  const level =
    typeof pathInfo.params.order === "number" && pathInfo.isLevel && batch
      ? batch.levels.find((level) => level.order === pathInfo.params.order)
      : undefined;
  return {
    theme: pathInfo.theme,
    pathInfo,
    info,
    images,
    nextAndPrevTheme: getThemePropsNextAndPrev(theme),
    clickable,
    batch,
    level,
    ...batches,
  } as unknown as ThemeStaticData<P>;
};
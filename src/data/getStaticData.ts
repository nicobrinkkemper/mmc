import { themeKeysNoPrefix } from "../config/config.js";
import { getTheme } from "./getTheme.js";
import { getThemeInfo } from "./getThemeInfo.js";
import { getThemePathInfo } from "./getThemePathInfo.js";
import { getThemePropsNextAndPrev } from "./getThemePropsNextAndPrev.js";
import { isValidPath } from "./isValidPath.js";

export const getAllStaticThemePages = () => {
  return themeKeysNoPrefix.map((theme) =>
    getStaticData(`/${theme}`)
  ) as ThemeStaticData<`/${Theme}`>[];
};

export const getStaticData = <P extends ValidPath = ValidPath>(
  path: P | string = "/"
): ThemeStaticData<P> => {
  isValidPath(path);
  const pathInfo = getThemePathInfo(path);
  const theme = pathInfo.theme;

  const themeData = getTheme(theme);
  const images = "images" in themeData ? themeData.images : ({} as never);
  const batches = themeData.batches;
  const info = getThemeInfo(theme);

  const batch =
    pathInfo.params.batchNumber && pathInfo.isBatch
      ? batches.find(
          (batch: any) => batch.batchNumber === pathInfo.params.batchNumber
        )
      : undefined;

  const level =
    typeof pathInfo.params.order === "number" && pathInfo.isLevel && batch
      ? batch.levels.find((level: any) => level.order === pathInfo.params.order)
      : undefined;

  let clickable: React.ElementType | "a" | "button" = "a";
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

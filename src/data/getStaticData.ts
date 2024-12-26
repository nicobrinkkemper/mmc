import { themes } from "../config/themeConfig.js";
import { getAdjacent } from "./getAdjacent.js";
import { getTheme } from "./getTheme.js";
import { getThemeInfo } from "./getThemeInfo.js";
import { getThemePathInfo } from "./getThemePathInfo.js";
import { isValidPath } from "./isValidPath.js";

export const getStaticData = <
  P extends ValidPath = ValidPath,
  Options extends ThemeDataOptions = ThemeDataOptions
>(
  path: P | string = "/",
  options: Options = {} as Options
): ThemeStaticData<P, Options> => {
  isValidPath(path);
  const pathInfo = getThemePathInfo(path);
  const theme = pathInfo.theme;

  const themeData: any = getTheme(theme);
  if (!themeData) {
    throw new Error(`Invalid theme: ${theme}`);
  }
  const images = "images" in themeData ? themeData.images : ({} as never);
  const batches = themeData.levelData.batches;
  const info = getThemeInfo(theme);

  const batchNumber =
    "batchNumber" in pathInfo.params ? pathInfo.params.batchNumber : undefined;
  const batch = batchNumber
    ? batches.find((batch: any) => batch.batchNumber === batchNumber)
    : undefined;

  const order = "order" in pathInfo.params ? pathInfo.params.order : undefined;
  const level = order
    ? batch.levels.find((level: any) => level.order === order)
    : undefined;

  let clickable: React.ElementType | "a" | "button" = "a";

  const result = {
    theme: pathInfo.theme,
    pathInfo,
    info,
    images,
    adjacent: getAdjacent(themes, pathInfo.theme),
    clickable,
    batch,
    level,
    ...batches,
  } as unknown as ThemeStaticData<P, Options>;
  // validate result via options object
  for (let [option, value] of Object.entries(options)) {
    if (value === true) {
      if (!(option in result)) {
        throw new Error(`Option ${option} is required`);
      }
    } else if (Array.isArray(value)) {
      if (!(option in result)) {
        throw new Error(`Option ${option} is required`);
      }
      if (!value.every((v) => v in result[option as never])) {
        throw new Error(`Option ${option} is required`);
      }
    }
  }
  return result;
};

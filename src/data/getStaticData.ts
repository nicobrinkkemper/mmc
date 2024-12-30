import { themes } from "../config/themeConfig.js";
import { isKeyOf } from "../utils/isKeyOf.js";
import { pickRequired } from "../utils/pickRequired.js";
import { getAdjacent } from "./getAdjacent.js";
import { getTheme } from "./getTheme.js";
import { getThemeInfo } from "./getThemeInfo.js";

const mapAdjacent = (
  {
    images,
  }: {
    images: { logo_simple_small?: any; logo_small: any };
  },
  path = ""
) => ({
  exists: true,
  value: {
    pathInfo: {
      to: path,
    },
    images: {
      logo:
        "logo_simple_small" in images
          ? images.logo_simple_small
          : images.logo_small,
    },
  },
});

export const getStaticData: ThemeStaticDataFn = (pathInfo, options) => {
  const theme = pathInfo.theme;

  if (!options) {
    return getTheme(theme);
  }
  const levelData = pickRequired(getTheme(theme), ["batches", "images"]);
  const { images, batches } = levelData;
  const optionEntries = Object.entries(options) as [
    Extract<keyof typeof options, string>,
    string[] | true
  ][];
  if (optionEntries.length === 0) {
    return { ...levelData, pathInfo };
  }
  const batchIndex =
    pathInfo.params.batchNumber !== ""
      ? levelData.batches.findIndex(
          (
            batch // @ts-ignore
          ) => batch.batchNumber === pathInfo.params.batchNumber
        )
      : -1;

  const batch = batchIndex !== -1 ? levelData.batches[batchIndex] : null;

  const levelIndex =
    pathInfo.params.order !== ""
      ? batch!.levels.findIndex(
          // @ts-ignore
          (level) => level.order === pathInfo.params.order
        )
      : -1;

  const level = levelIndex !== -1 ? batch!.levels[levelIndex] : null;

  const result = {
    ...levelData,
    pathInfo,
  } as any;

  // build & validate result via options object
  try {
    for (let [option, value] of optionEntries) {
      if (isKeyOf(option, result)) {
        continue;
      }
      switch (option) {
        case "batch": {
          if (!batch) break;
          result.batch = batch;
          if (value === true) {
            // the default value for batch is to get the adjacent
            value = ["adjacent"];
          }
          for (let nestedOption of value) {
            if (nestedOption in result.batch) {
              continue;
            }
            switch (nestedOption) {
              case "adjacent": {
                result.batch.adjacent = getAdjacent(
                  batches as never,
                  batchIndex
                ).adjacent;
                break;
              }
              default: {
                if (!isKeyOf(nestedOption, batch!)) {
                  throw new Error(
                    `Unhandled batch option ${option}.${nestedOption}`
                  );
                }
              }
            }
          }
          break;
        }
        case "level": {
          if (!level) break;
          result.level = level;
          if (value === true) {
            // the default value for level is to get the adjacent
            value = ["adjacent"];
          }
          for (let nestedOption of value) {
            if (nestedOption in result.level) {
              continue;
            }
            switch (nestedOption) {
              case "adjacent": {
                result.level.adjacent = getAdjacent(
                  batch!.levels,
                  levelIndex
                ).adjacent;
                break;
              }
              default: {
                if (!isKeyOf(nestedOption, level!)) {
                  throw new Error(
                    `Unhandled level option ${option}.${nestedOption}`
                  );
                }
              }
            }
          }
          break;
        }
        case "adjacent": {
          const { adjacent } = getAdjacent(themes, pathInfo.theme);
          result.adjacent = {
            next:
              adjacent.next.exists === true
                ? mapAdjacent(
                    getTheme(adjacent.next.value),
                    `/${adjacent.next.value}${pathInfo.path}`
                  )
                : adjacent.next,
            prev:
              adjacent.prev.exists === true
                ? mapAdjacent(
                    getTheme(adjacent.prev.value),
                    `/${adjacent.prev.value}${pathInfo.path}`
                  )
                : adjacent.prev,
          };
          break;
        }
        case "images": {
          if (value === true) {
            break;
          }
          for (let nestedOption of value) {
            if (nestedOption in result.images) {
              continue;
            }
            switch (nestedOption) {
              default: {
                if (!isKeyOf(nestedOption, images)) {
                  throw new Error(
                    `Unhandled images option ${option}.${nestedOption}`
                  );
                }
              }
            }
          }
          break;
        }
        case "clickable":
          result.clickable = "a";
          break;
        case "small": {
          result.small = true;
          break;
        }
        case "info": {
          result.info = getThemeInfo(theme);
          break;
        }
        default:
          throw new Error(
            `Option ${option} is required but has no case for ${
              pathInfo.to
            }. Available options: ${Object.keys(result).join(", ")}`
          );
      }
    }
  } catch (error) {
    console.error({ options, keys: Object.keys(result) });
    throw error;
  }
  // we made it passed all the throws, must be ok
  return result;
};
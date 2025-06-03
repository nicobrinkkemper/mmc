import {
  createAbsoluteURL,
  createBaseURL,
} from "vite-plugin-react-server/utils";
import { ClientClickable } from "../components/Clickable.client.js";
import { levels, siteName, themes } from "../config/themeConfig.js";
import { isKeyOf } from "../utils/isKeyOf.js";
import { pickRequired } from "../utils/pickRequired.js";
import { getAdjacent } from "./getAdjacent.js";
import { getTheme } from "./getTheme.js";
import { getThemeInfo } from "./getThemeInfo.js";

let publicOrigin = import.meta.env.PUBLIC_ORIGIN ?? "https://mmcelebration.com";
let baseUrl = import.meta.env.BASE_URL ?? "/";
let absoluteURL = createAbsoluteURL(baseUrl, publicOrigin);
let baseURL = createBaseURL(baseUrl);
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
        images && "logo_simple_small" in images
          ? images.logo_simple_small
          : images?.logo_small,
    },
  },
});

export const getStaticData: GetStaticDataFn = async (pathInfo, options) => {
  const theme = pathInfo.theme;

  if (!options) {
    return await getTheme(theme);
  }
  const levelData = pickRequired(await getTheme(theme), ["batches", "images"]);
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
          (batch: any) => batch.batchNumber === pathInfo.params.batchNumber
        )
      : -1;

  const batch = batchIndex !== -1 ? levelData.batches[batchIndex] : null;

  const levelIndex =
    pathInfo.params.order !== ""
      ? batch!.levels.findIndex(
          (level: any) => level.order === pathInfo.params.order
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
          result.batch.toBatch = baseURL(
            `${pathInfo.theme}/${levels}/${batch.batchNumber}`
          );
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
                if (result.batch.adjacent.next.exists) {
                  result.batch.adjacent.next.value.toBatch = baseURL(
                    `${pathInfo.theme}/${levels}/${result.batch.adjacent.next.value.batchNumber}`
                  );
                }
                if (result.batch.adjacent.prev.exists) {
                  result.batch.adjacent.prev.value.toBatch = baseURL(
                    `${pathInfo.theme}/${levels}/${result.batch.adjacent.prev.value.batchNumber}`
                  );
                }
                break;
              }
              default: {
                if (!isKeyOf(nestedOption, batch!)) {
                  console.warn(
                    `Unhandled batch option ${option}.${nestedOption}`
                  );
                  result[option][nestedOption] = value;
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
                result.level.adjacent = getAdjacent<
                  Exclude<typeof batch, null>["levels"]
                >(batch!.levels, levelIndex).adjacent;
                break;
              }
              default: {
                if (!isKeyOf(nestedOption, level!)) {
                  console.warn(
                    `Unhandled level option ${option}.${nestedOption}`
                  );
                  result[option][nestedOption] = nestedOption;
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
                    await getTheme(adjacent.next.value),
                    `/${adjacent.next.value}${pathInfo.path}`
                  )
                : adjacent.next,
            prev:
              adjacent.prev.exists === true
                ? mapAdjacent(
                    await getTheme(adjacent.prev.value),
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
                  console.warn(
                    `Unhandled images option ${option}.${nestedOption}`
                  );
                  result[option][nestedOption] = nestedOption;
                }
              }
            }
          }
          break;
        }
        case "clickable":
          if (!result.clickable) {
            try {
              result.clickable = ClientClickable;
            } catch (error) {
              console.error("Error loading ClientClickable:", error);
            }
          }
          break;
        case "small": {
          result.small = true;
          break;
        }
        case "pathInfo": {
          result.pathInfo = pathInfo;
          break;
        }
        case "info": {
          result.info = getThemeInfo(theme);
          break;
        }
        case "accordion": {
          // TODO: add client-side accordion
          result.accordion = {
            accordion: "div",
            accordionItem: "div",
            accordionItemHeading: "div",
            accordionItemButton: "div",
            accordionItemPanel: "div",
          } satisfies AccordionProps;
          break;
        }
        case "updated": {
          result.updated = new Date().toISOString();
          break;
        }
        case "published": {
          result.published = new Date().toISOString();
          break;
        }
        case "favicons": {
          result.favicons = {
            favicon_512x512: absoluteURL(images.favicon_512x512.src),
            favicon_192x192: absoluteURL(images.favicon_192x192.src),
            favicon_64x64: absoluteURL(images.favicon_64x64.src),
            favicon: absoluteURL(images.favicon.src),
          };
          break;
        }
        case "image": {
          result.image = absoluteURL(images?.favicon_512x512.src);
          break;
        }
        case "title": {
          result.title = `${pathInfo.theme} | ${siteName}`;
          break;
        }
        case "description": {
          result.description = `${pathInfo.theme} | ${siteName}`;
          break;
        }
        case "url": {
          result.url = absoluteURL(pathInfo.to);
          break;
        }
        case "tags": {
          result.tags = [
            "Mario Maker 2",
            "Mario Maker Community Levels",
            "Mario Anniversary",
          ];
          break;
        }
        case "contentType": {
          result.contentType = "text/html; charset=UTF-8";
          break;
        }
        case "category": {
          result.category = "gaming";
          break;
        }
        case "twitter": {
          result.twitter = "summary";
          break;
        }
        default:
          console.warn(
            `Option ${option} is required but has no case for ${
              pathInfo.to
            }. Available options: ${Object.keys(result).join(", ")}`
          );
          result[option] = value;
      }
    }
  } catch (error) {
    console.trace(error);
    console.error("getStaticData error", {
      options,
      keys: Object.keys(result),
    });
    throw error;
  }
  return result;
};

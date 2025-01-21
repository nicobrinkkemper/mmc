import { BASE_URL } from "../config/env.js";
import { defaultDescription, defaultTitle } from "../config/themeConfig.js";

export const createHead: CreateHeadFn =
  (fn) =>
  ({ pathInfo, images, ...props }) => {
    try {
      const defaultMeta = {
        title: defaultTitle,
        description: defaultDescription,
        url: BASE_URL + pathInfo?.to,
        contentType: "text/html",
        published: props.published
          ? props.published
          : new Date(Date.now()).toDateString(),
        updated: props.updated
          ? props.updated
          : new Date(Date.now()).toDateString(),
        category: "gaming",
        tags: [
          "Mario Maker 2",
          "Mario Maker Community Levels",
          "Mario Anniversary",
        ],
        twitter: "summary",
        image: BASE_URL + images?.favicon_512x512?.src,
        favicons: {
          favicon_512x512: images?.favicon_512x512?.src,
          favicon_192x192: images?.favicon_192x192?.src,
          favicon_64x64: images?.favicon_64x64?.src,
          favicon: images?.favicon?.src,
        },
      };
      const customHeadProperties = fn({
        ...defaultMeta,
        images,
        pathInfo,
        ...props,
      });
      return {
        images,
        ...props,
        ...defaultMeta,
        ...customHeadProperties,
        pathInfo,
      };
    } catch (error) {
      console.error(pathInfo, error);
      throw error;
    }
  };

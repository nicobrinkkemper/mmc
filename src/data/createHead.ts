// import { BASE_URL } from "../config/env.server.js";
// import { defaultDescription, defaultTitle } from "../config/themeConfig.js";
// import { getThemePathInfo } from "./getThemePathInfo.js";

// export const createHead: CreateHeadFn =
//   (route, options, fn) =>
//   async ({ pathInfo, images, info, ...props }) => {
//     try {
//       const defaultMeta = {
//         title: defaultTitle,
//         description: defaultDescription,
//         url: BASE_URL.endsWith("/")
//           ? BASE_URL + pathInfo?.to
//           : BASE_URL + "/" + pathInfo.to,
//         contentType: "text/html",
//         published: props.published
//           ? props.published
//           : new Date(Date.now()).toDateString(),
//         updated: props.updated
//           ? props.updated
//           : new Date(Date.now()).toDateString(),
//         category: "gaming",
//         tags: [
//           "Mario Maker 2",
//           "Mario Maker Community Levels",
//           "Mario Anniversary",
//         ],
//         twitter: "summary",
//         image: BASE_URL + images?.favicon_512x512?.src,
//         favicons: {
//           favicon_512x512: images?.favicon_512x512?.src,
//           favicon_192x192: images?.favicon_192x192?.src,
//           favicon_64x64: images?.favicon_64x64?.src,
//           favicon: images?.favicon?.src,
//         },
//       };
//       const newProps = {
//         ...defaultMeta,
//         info,
//         images,
//         pathInfo,
//         ...props,
//       };
//       const customHeadProperties = (await fn(newProps as any)) as Record<
//         string,
//         unknown
//       >;
//       return {
//         images,
//         info,
//         ...props,
//         ...defaultMeta,
//         ...customHeadProperties,
//         pathInfo,
//       };
//     } catch (error) {
//       console.error(pathInfo, error);
//       throw error;
//     }
//   };

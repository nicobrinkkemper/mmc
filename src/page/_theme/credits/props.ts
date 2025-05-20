import { absoluteUrl } from "../../../config/env.server.js";
import { siteName } from "../../../config/themeConfig.js";
import { createProps } from "../../../data/createProps.js";

export const route = `/:theme/credits` as const;
export type RouteType = typeof route;

export const props = createProps(
  route,
  {
    images: [
      "logo",
      "favicon",
      "favicon_512x512",
      "favicon_192x192",
      "favicon_64x64",
      "illustration",
    ],
    info: ["caps", "writtenOut"],
    pathInfo: ["to", "theme", "toHome", "toCredits", "route"],
    clickable: true,
    adjacent: {
      pathInfo: ["to"],
      images: ["logo"],
    },
    favicons: true,
    published: true,
    updated: true,
    twitter: true,
    contentType: true,
    category: true,
    tags: true,
    url: true,
    title: true,
    description: true,
    image: true,
  },
  ({ info: { caps }, images: { logo } }) => ({
    description: `Special thanks to all contributors! ${siteName}`,
    title: `${caps} | Credits | Site by General BB`,
    image: absoluteUrl(logo.src),
  })
);

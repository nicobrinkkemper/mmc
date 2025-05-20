import { siteName } from "../../config/themeConfig.js";
import { createProps } from "../../data/createProps.js";

export const route = "/404" as const;
export type RouteType = typeof route;

export const props = createProps(
  route,
  {
    images: ["logo", "favicon"],
    pathInfo: true,
    info: true,
    clickable: true,
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
  ({ info: { writtenOut }, images: { logo } }) => ({
    description: `${writtenOut}! | ${siteName}`,
    title: `${writtenOut} | 404`,
    image: (process.env["VITE_BASE_URL"] ?? "/") + logo,
  })
);

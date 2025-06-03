import { absoluteURL } from "../../config/env.server.js";
import { siteName } from "../../config/themeConfig.js";
import { createProps } from "../../data/createProps.js";

export const route = `/:theme` as const;
export type RouteType = typeof route;

export const props = createProps(
  route,
  {
    images: true,
    info: true,
    pathInfo: true,
    adjacent: true,
    clickable: true,
    accordion: true,
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
  ({ info: { writtenOut, caps, ordinal }, images: { logo } }) => ({
    description: `${caps}! | Welcome to ${writtenOut} | ${siteName}`,
    title: `${caps} | Celebrating ${ordinal} years of Mario Maker!`,
    image: absoluteURL(logo.src),
  })
);

import { BASE_URL } from "../../config/env.js";
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
  },
  ({ info: { writtenOut, caps, ordinal }, images: { logo } }) => ({
    description: `${caps}! | Welcome to ${writtenOut} | ${siteName}`,
    title: `${caps} | Celebrating ${ordinal} years of Mario Maker!`,
    image: BASE_URL + logo.src,
  })
);

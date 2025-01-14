import { BASE_URL } from "../../config/constants.js";
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
  ({ info: { writtenOut, caps }, images: { logo } }) => ({
    description: `Welcome to ${caps}! | ${siteName}`,
    title: `${writtenOut} | Welcome`,
    image: BASE_URL + logo.src,
  })
);

import { absoluteURL } from "../../config/env.js";
import { siteName } from "../../config/themeConfig.js";
import { createProps } from "../../data/createProps.js";
import { getRoute } from "../../data/getRoute.js";
import { getThemePathInfo } from "../../data/getThemePathInfo.js";

export const route = `/:theme` as const;
export type RouteType = typeof route;

const homeProps = createProps(
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

/**
 * Each theme's `app/<theme>/route.tsx` layout wraps its whole subtree and shares
 * this loader (re-exported by every `<theme>/props.ts`), so it is invoked not
 * just for the theme home (`/5ymm`) but for every descendant the layout wraps
 * (`/5ymm/credits`, `/5ymm/levels/…`). The full home data only makes sense at the
 * theme root; deeper down the layout needs only the theme identity — so return
 * that instead of tripping the home-route validator.
 */
export const props = async <T extends string = typeof route>(to: T) =>
  (getRoute(to).route === route
    ? homeProps(to)
    : { pathInfo: getThemePathInfo(to) });

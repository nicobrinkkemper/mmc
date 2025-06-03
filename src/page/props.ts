import { absoluteURL } from "../config/env.server.js";
import { siteName } from "../config/themeConfig.js";
import { createProps } from "../data/createProps.js";
/**
 * Root page configuration. It should mirror the configuration of the home pages.
 * The idea is that every route gets a prop.ts, page.tsx, and index.ts file exporting:
 * - route: the route string
 * - props: the props object
 *
 * It's a bit similar to the idea of next.js's getStaticProps, but for us every page is static so that simplifies things.
 */

/**
 * Usage: `[MainPage.route]: MainPage`
 */
export const route = "/";

/**
 * Usage: `Page: ThemePageComponent<RouteType> = ...` alternatively `Page: ThemePageComponent<typeof route> = ...` or simply "/"
 */
export type RouteType = typeof route;

/**
 * This is the props export.
 */
export const props = createProps(
  route,
  {
    images: true,
    info: true,
    pathInfo: true,
    adjacent: true,
    clickable: true,
    favicons: true,
    accordion: true,
    published: true,
    updated: true,
    twitter: true,
    contentType: true,
    category: true,
    tags: true,
    url: true,
    title: true,
    description: true,
  },
  ({ info: { writtenOut, caps, ordinal }, images: { logo } }) => ({
    description: `${caps}! | Welcome to ${writtenOut} | ${siteName}`,
    title: `${caps} | Celebrating ${ordinal} years of Mario Maker!`,
    image: absoluteURL(logo.src),
  })
);

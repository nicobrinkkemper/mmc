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
  },
  (props) => {
    return props;
  }
);

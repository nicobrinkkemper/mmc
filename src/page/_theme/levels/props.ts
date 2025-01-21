import { BASE_URL } from "../../../config/env.js";
import { siteName } from "../../../config/themeConfig.js";
import { createProps } from "../../../data/createProps.js";

export const route = "/:theme/levels";
export type RouteType = typeof route;

export const props = createProps(
  route,
  {
    images: true,
    info: true,
    batches: true,
    pathInfo: true,
    clickable: true,
    adjacent: true,
  },
  ({ info: { writtenOut }, images: { logo } }) => ({
    description: `The ${writtenOut}! | ${siteName}`,
    image: BASE_URL + logo,
  })
);

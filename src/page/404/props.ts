import { BASE_URL } from "../../config/env.js";
import { siteName } from "../../config/themeConfig.js";
import { createProps } from "../../data/createProps.js";

export const route = "/404" as const;
export type RouteType = typeof route;

export const props = createProps(
  route,
  {
    images: ["logo"],
    pathInfo: true,
    info: true,
    clickable: true,
  },
  ({ info: { writtenOut }, images: { logo } }) => ({
    description: `The ${writtenOut}! | ${siteName}`,
    image: BASE_URL + logo,
  })
);

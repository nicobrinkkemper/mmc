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
  (props) => {
    if (!props) throw new Error("props is undefined");
    const {
      info: { writtenOut },
      images: { logo },
    } = props;
    return {
      description: `The ${writtenOut}! | ${siteName}`,
      image: (process.env["VITE_BASE_URL"] ?? "/") + logo,
    };
  }
);

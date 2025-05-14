import { absoluteUrl } from "../../../../../config/env.server.js";
import { createProps } from "../../../../../data/createProps.js";

export const route = "/:theme/levels/:batchNumber/:order" as const;
export type RouteType = typeof route;

export const props = createProps(
  route,
  {
    images: true,
    info: true,
    level: true,
    batch: true,
    pathInfo: true,
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
  },
  ({ info: { caps }, level }) => {
    if (!level || !("levelName" in level))
      throw new Error(`${caps} level not found`);
    return {
      description: `${caps} level by ${level.makerName.value}: ${level.levelName.value} - ${level.levelCode}`,
      title: `${level.levelName.value} | ${level.levelCode} | ${caps}`,
      image: absoluteUrl(level.images.level.src),
      twitter: "summary_large_image",
    };
  }
);

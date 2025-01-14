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
  },
  ({ info: { caps }, level }) => {
    if (!level || !("makerName" in level)) return {};
    return {
      description: `${caps} level by ${level.makerName.value}: ${level.levelName.value} - ${level.levelCode}`,
      title: `${level.levelName.value} | ${level.levelCode} | ${caps}`,
      image: level.images.level,
      twitter: "summary_large_image",
    };
  }
);

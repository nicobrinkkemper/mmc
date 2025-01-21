import { BASE_URL } from "../../../../config/env.js";
import { levels } from "../../../../config/themeConfig.js";
import { convertNumberToWord } from "../../../../data/convertNumberToWord.js";
import { createProps } from "../../../../data/createProps.js";

export const route = "/:theme/levels/:batchNumber" as const;
export type RouteType = typeof route;

const humanReadableArray = <ARR extends readonly string[]>(a: ARR): string => {
  if (a.length === 1) return a[0];
  return [a.slice(0, a.length - 1).join(", "), a[a.length - 1]].join(" and ");
};

export const props = createProps(
  route,
  {
    images: true,
    info: true,
    batch: true,
    pathInfo: true,
    clickable: true,
    small: true,
  },
  ({ info: { writtenOut, caps }, images: { logo }, batch }) => {
    if (!batch || !("batchNumber" in batch)) return {};
    return {
      description: `Week ${
        batch?.batchNumber
      } of ${caps} has started! In this week's trailer we show off ${convertNumberToWord(
        levels.length
      )} new levels: ${humanReadableArray(
        batch?.levels.map(({ levelName: { value } }) => value)
      )}. Celebrating ${writtenOut}! Week ${batch.batchNumber} released at ${
        batch.releaseDate.value
      }.`,
      title: `${caps} | Week overview`,
      image: BASE_URL + logo,
    };
  }
);

import { absoluteURL } from "../../../../config/env.js";
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
  ({ info: { writtenOut, caps }, images: { logo }, batch }) => {
    if (!batch || !("batchNumber" in batch)) return {};

    const levels = batch.levels ?? [];
    const released = levels.length > 0;

    // Released and unreleased weeks read differently: a released week describes
    // the actual levels it shipped; an upcoming week is a teaser.
    const description = released
      ? `Week ${batch.batchNumber} of ${caps} has started! In this week's trailer we show off ${convertNumberToWord(
          levels.length
        )} new levels: ${humanReadableArray(
          levels.map(({ levelName: { value } }) => value)
        )}. Celebrating ${writtenOut}! Week ${batch.batchNumber} was released on ${batch.releaseDate?.value}.`
      : `Week ${batch.batchNumber} of ${caps} is coming soon — stay tuned for more information. Celebrating ${writtenOut}!`;

    return {
      description,
      title: `${caps} | Week overview`,
      image: absoluteURL(logo.src),
    };
  }
);

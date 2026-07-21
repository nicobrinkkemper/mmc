import { snakeCase } from "lodash-es";

/**
 * The single slug function for About accordion sections. AboutItem derives
 * each section's id from its heading text with THIS function, and
 * getStaticData's preExpanded list must be produced with it too — two
 * spellings would silently never match and the default-open section would
 * render closed.
 */
export const aboutSectionSlug = (headingText: string): string =>
  snakeCase(headingText);

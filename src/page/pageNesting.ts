import {
  credits,
  isValidTheme,
  levels,
  notfound,
} from "../config/themeConfig.js";

const isNumber = (seg: string): seg is string =>
  !isNaN(Number(seg)) && seg !== "";

const isLiteral =
  <T extends string>(seg1: string) =>
  (seg2: string): seg2 is T =>
    seg1 === seg2;
/**
 * For each possible nested level, we have a map of guards that will be used to validate the path.
 * The guards are functions that return true if the path segment is valid for that level.
 * We will use the first guards to start counting, ignoring any segments infront that's not a theme or 404 (in our case)
 */
export const pageNesting = [
  {
    $theme: isValidTheme,
    [notfound]: isLiteral(notfound),
  },
  {
    [credits]: isLiteral(credits),
    [levels]: isLiteral(levels),
  },
  {
    $batchNumber: isNumber,
  },
  {
    $order: isNumber,
  },
] as const;

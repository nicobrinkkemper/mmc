import {
  credits,
  isValidTheme,
  levels,
  notfound,
} from "../config/themeConfig.js";

/**
 * For each possible nested level, we have a map of guards that will be used to validate the path.
 * The guards are functions that return true if the path segment is valid for that level.
 * We will use the first guards to start counting, ignoring any segments infront that's not a theme or 404 (in our case)
 */
export const pageNesting = [
  {
    $theme: isValidTheme,
    [notfound]: (seg: string): seg is typeof notfound => seg === notfound,
  },
  {
    [credits]: (seg: string): seg is typeof credits => seg === credits,
    [levels]: (seg: string): seg is typeof levels => seg === levels,
  },
  {
    $batchNumber: (seg: string): seg is string => !isNaN(Number(seg)),
  },
  {
    $order: (seg: string): seg is string => !isNaN(Number(seg)),
  },
] as const;

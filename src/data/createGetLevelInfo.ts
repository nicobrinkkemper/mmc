import { getLevelPathInfo } from "./getLevelPathInfo.js";
import { getThemePropsNextAndPrevLevel } from "./getThemePropsNextAndPrevLevel.js";
import { isValidNumberParam } from "./isValidNumberParam.js";

export const createGetLevelInfo = (
  pathInfo: Pick<ThemePathInfo, "themeSlug">
) =>
  function getLevelInfo(
    level: ThemeLevel | Level,
    i: number,
    levels: (ThemeLevel | Level)[]
  ): ThemeLevel {
    let order = String(level.order);
    if (!isValidNumberParam(order, levels[0].order, levels.length)) {
      order = String(levels[0].order);
    }
    const isUnreleased = new Date(level.releaseDate.date) > new Date();

    // Get next/prev levels first
    const nextAndPrev = getThemePropsNextAndPrevLevel(
      levels as ThemeLevel[],
      i
    );

    // Add pathInfo to next/prev levels if they exist
    if (nextAndPrev.nextLevel.exists && nextAndPrev.nextLevel.level) {
      nextAndPrev.nextLevel.level.pathInfo = getLevelPathInfo(
        pathInfo,
        nextAndPrev.nextLevel.level
      );
    }
    if (nextAndPrev.prevLevel.exists && nextAndPrev.prevLevel.level) {
      nextAndPrev.prevLevel.level.pathInfo = getLevelPathInfo(
        pathInfo,
        nextAndPrev.prevLevel.level
      );
    }

    return {
      ...level,
      order,
      orderIndex: i,
      isUnreleased,
      pathInfo: getLevelPathInfo(pathInfo, level),
      nextAndPrev,
    };
  };

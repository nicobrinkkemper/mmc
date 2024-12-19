import { getLevelPathInfo } from "./getLevelPathInfo.js";
import { getThemePropsNextAndPrevLevel } from "./getThemePropsNextAndPrevLevel.js";
import { isValidNumberParam } from "./isValidNumberParam.js";
export const createGetLevelInfo = (pathInfo) => function getLevelInfo(level, i, levels) {
    let order = level.order;
    if (!isValidNumberParam(order, levels[0].order, levels.length)) {
        order = levels[0].order;
    }
    const isUnreleased = new Date(level.releaseDate.date) > new Date();
    // Get next/prev levels first
    const nextAndPrev = getThemePropsNextAndPrevLevel(levels, i);
    // Add pathInfo to next/prev levels if they exist
    if (nextAndPrev.nextLevel.exists && nextAndPrev.nextLevel.level) {
        nextAndPrev.nextLevel.level.pathInfo = getLevelPathInfo(pathInfo, nextAndPrev.nextLevel.level);
    }
    if (nextAndPrev.prevLevel.exists && nextAndPrev.prevLevel.level) {
        nextAndPrev.prevLevel.level.pathInfo = getLevelPathInfo(pathInfo, nextAndPrev.prevLevel.level);
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
//# sourceMappingURL=createGetLevelInfo.js.map
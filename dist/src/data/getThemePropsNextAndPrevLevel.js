export const getAdjacentLevel = (levels, orderIndex, offset) => {
    const adjacentIndex = orderIndex + offset;
    const level = levels[adjacentIndex];
    const exists = level !== undefined;
    return {
        exists,
        level,
    };
};
export function getThemePropsNextAndPrevLevel(levels, orderIndex) {
    return {
        nextLevel: getAdjacentLevel(levels, orderIndex, 1),
        prevLevel: getAdjacentLevel(levels, orderIndex, -1),
    };
}
//# sourceMappingURL=getThemePropsNextAndPrevLevel.js.map
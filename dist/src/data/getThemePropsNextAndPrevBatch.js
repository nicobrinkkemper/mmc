export const getAdjacentBatch = (batches, index, offset) => {
    const adjacentIndex = index + offset;
    const batch = batches[adjacentIndex];
    const exists = batch !== undefined;
    return { exists, batch };
};
export const getThemePropsNextAndPrevBatch = (batches, currentIndex) => {
    return {
        nextBatch: getAdjacentBatch(batches, currentIndex, 1),
        prevBatch: getAdjacentBatch(batches, currentIndex, -1),
    };
};
//# sourceMappingURL=getThemePropsNextAndPrevBatch.js.map
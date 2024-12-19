export const getAdjacentBatch = <B extends ThemeBatch | Batch>(
  batches: B[],
  index: number,
  offset: number
): BatchExists<B> => {
  const adjacentIndex = index + offset;
  const batch = batches[adjacentIndex];
  const exists = batch !== undefined;
  return { exists, batch } as BatchExists<B>;
};

export const getThemePropsNextAndPrevBatch = (
  batches: ThemeBatch[],
  currentIndex: number
): ThemePropsNextAndPrevBatch => {
  return {
    nextBatch: getAdjacentBatch(batches, currentIndex, 1),
    prevBatch: getAdjacentBatch(batches, currentIndex, -1),
  };
};

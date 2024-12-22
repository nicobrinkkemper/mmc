export const getAdjacentBatch = <T extends Theme, B extends NumberParam>(
  batches: BeforeNextAndPrevBatchIsAdded<T, B>[],
  index: number,
  offset: number
): BatchExists<T, B> => {
  const adjacentIndex = index + offset;
  const batch = batches[adjacentIndex];
  const exists = batch !== undefined;
  return { exists, batch } as BatchExists<T, B>;
};

export const getThemePropsNextAndPrevBatch = <T extends Theme, B extends NumberParam>(
  batches: BeforeNextAndPrevBatchIsAdded<T, B>[],
  currentIndex: number
): ThemePropsNextAndPrevBatch<T, B> => {
  return {
    nextBatch: getAdjacentBatch(batches, currentIndex, 1),
    prevBatch: getAdjacentBatch(batches, currentIndex, -1),
  };
};

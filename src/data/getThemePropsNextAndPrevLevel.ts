type BeforeNextAndPrevLevelIsAdded<
  T extends Theme,
  B extends NumberParam,
  O extends NumberParam
> = Omit<ThemeLevel<`/${T}/level/${B}/${O}`>, "nextAndPrev">;

export const getAdjacentLevel = <
  P extends `/${T}/level/${B}/${O}`,
  T extends Theme,
  B extends NumberParam,
  O extends NumberParam
>(
  levels: BeforeNextAndPrevLevelIsAdded<T, B, O>[],
  orderIndex: number,
  offset: number
): LevelExists<P, T, B, O> => {
  const adjacentIndex = orderIndex + offset;
  const level = levels[adjacentIndex];
  const exists = level !== undefined;
  return { exists, level } as LevelExists<P, T, B, O>;
};

export function getThemePropsNextAndPrevLevel<
  T extends Theme,
  B extends NumberParam,
  O extends NumberParam
>(
  levels: BeforeNextAndPrevLevelIsAdded<T, B, O>[],
  orderIndex: number
): ThemePropsNextAndPrevLevel<`/${T}/level/${B}/${O}`> {
  return {
    nextLevel: getAdjacentLevel(levels, orderIndex, 1),
    prevLevel: getAdjacentLevel(levels, orderIndex, -1),
  };
}

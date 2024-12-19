export const getAdjacentLevel = <L extends ThemeLevel | Level>(
  levels: L[],
  orderIndex: number,
  offset: number
): LevelExists<L> => {
  const adjacentIndex = orderIndex + offset;
  const level = levels[adjacentIndex];
  const exists = level !== undefined;
  return {
    exists,
    level,
  } as LevelExists<L>;
};

export function getThemePropsNextAndPrevLevel(
  levels: ThemeLevel[],
  orderIndex: number
): ThemePropsNextAndPrevLevel {
  return {
    nextLevel: getAdjacentLevel(levels, orderIndex, 1),
    prevLevel: getAdjacentLevel(levels, orderIndex, -1),
  };
}

export function getLevelPathInfo<
  T extends Theme = Theme,
  B extends NumberParam = NumberParam,
  O extends NumberParam = NumberParam,
  P extends `/${T}/level/${B}/${O}` = `/${T}/level/${B}/${O}`
>(
  pathInfo: Pick<ThemePathInfo<P>, "themeSlug">,
  level: Pick<ThemeLevel<T> | Level<T>, "order" | "batchNumber">
): ThemeLevelPathInfo<T, B, O, P> {
  const pathname = `/level/${level.batchNumber}/${level.order}`;
  const to = `${pathInfo.themeSlug}${pathname}`;
  return {
    pathname: pathname,
    to: to,
    params: {
      order: String(level.order) as B,
      batchNumber: level.batchNumber as O,
    },
  } as ThemeLevelPathInfo<T, B, O, P>;
}

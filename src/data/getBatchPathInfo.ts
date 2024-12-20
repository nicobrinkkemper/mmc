export function getBatchPathInfo<
  T extends Theme = Theme,
  B extends NumberParam = NumberParam,
  P extends `/${T}/levels/${B}` = `/${T}/levels/${B}`
>(
  pathInfo: Pick<ThemePathInfo<P>, "themeSlug">,
  batch: Pick<ThemeBatch<T> | Batch<T>, "batchNumber">
): ThemeBatchPathInfo<T, B, P> {
  const pathname = `/levels/${batch.batchNumber}`;
  const to = `${pathInfo.themeSlug}${pathname}`;
  return {
    pathname: pathname,
    to: to,
    params: {
      batchNumber: batch.batchNumber,
    },
  } as ThemeBatchPathInfo<T, B, P>;
}

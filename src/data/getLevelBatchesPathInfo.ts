const levels = `/levels`;

export function getLevelBatchesPathInfo<
  P extends `/${T}/levels`,
  T extends Theme = Theme
>(pathInfo: Pick<ThemePathInfo<P>, "themeSlug">): ThemeBatchesPathInfo<P, T> {
  const to = `${pathInfo.themeSlug}${levels}` as P;
  return {
    pathname: levels,
    to: to,
    isBatches: true,
  } as ThemeBatchesPathInfo<P, T>;
}

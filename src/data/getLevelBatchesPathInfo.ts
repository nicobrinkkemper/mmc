const levels = `/levels`;

export function getLevelBatchesPathInfo<T extends Theme = Theme>(
  to: `/${T}/levels`
): ThemeBatchesPathInfo<typeof to, T> {
  return {
    pathname: levels,
    to: to,
    isBatches: true,
  } as ThemeBatchesPathInfo<typeof to, T>;
}

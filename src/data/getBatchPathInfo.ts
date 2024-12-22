export function getBatchPathInfo<
  T extends Theme = Theme,
  B extends NumberParam = NumberParam
>(to: `/${T}/levels/${B}`): ThemeBatchPathInfo<typeof to, T, B> {
  const segments = to.split("/");
  const theme = segments[1];
  const page = segments[2];
  const batchNumber = segments[3];
  return {
    themeSlug: `/${theme}`,
    path: [theme, page, batchNumber],
    to: to,
    isBatch: page === "levels" && segments.length === 4,
    params: {
      batchNumber: batchNumber as B,
    },
  } as ThemeBatchPathInfo<typeof to, T, B>;
}

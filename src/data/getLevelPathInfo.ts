export function getLevelPathInfo<
  T extends Theme = Theme,
  B extends NumberParam = NumberParam,
  O extends NumberParam = NumberParam
>(to: `/${T}/level/${B}/${O}`): ThemeLevelPathInfo<typeof to, T, B, O> {
  const segments = to.split("/");
  const theme = segments[1] as T;
  const page = segments[2] as "level";
  const batchNumber = segments[3] as B;
  const order = segments[4] as O;
  if (page !== "level") {
    throw new Error("Invalid path");
  }
  return {
    isLevel: true,
    path: [theme, "level", batchNumber, order] as [T, "level", B, O],
    to,
    themeSlug: `/${theme}` as `/${T}`,
    params: {
      batchNumber,
      order,
    },
  };
}

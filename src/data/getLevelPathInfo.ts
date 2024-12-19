export function getLevelPathInfo(
  pathInfo: Pick<ThemePathInfo, "themeSlug">,
  level: Pick<ThemeLevel | Level, "order" | "batchNumber">
): ThemeLevelPathInfo {
  const pathname = `/level/${level.batchNumber}/${level.order}`;
  return {
    pathname,
    to: pathInfo.themeSlug + pathname,
    orderParam: String(level.order),
    batchNumberParam: String(level.batchNumber),
  };
}

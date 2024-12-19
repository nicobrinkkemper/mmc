export function getBatchPathInfo(
  pathInfo: Pick<ThemePathInfo, "toLevels">,
  batch: Pick<ThemeBatch | Batch, "batchNumber">
): ThemeBatchPathInfo {
  const pathname = `/${batch.batchNumber}`;
  return {
    pathname: pathInfo.toLevels,
    to: pathInfo.toLevels + pathname,
    batchNumberParam: String(batch.batchNumber),
  };
}

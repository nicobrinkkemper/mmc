const link = (gid: number) => ({
  gid,
  link: `https://docs.google.com/spreadsheets/d/e/2PACX-1vROk4rxqS9jPImRfwqL6T6pFHJSBs4Gx3O9JUzabTeDA0aZrr2xccinxeuWhSNJJflByzbE63CAkZj0/pub?gid=${gid}&single=true&output=csv`,
});
/**
 * Helper to create final configuration object that will be used for the codebase.
 */
export const createConfig = <
  T extends string,
  GID extends number,
  Youtubes extends string[]
>(themeConfig: {
  theme: T;
  gid: GID;
  weekTrailers: Youtubes;
}) =>
  ({
    weekTrailers: themeConfig.weekTrailers,
    spreadsheet: {
      gid: themeConfig.gid,
      link: link(themeConfig.gid).link,
    },
    key: `_${themeConfig.theme}`,
    theme: themeConfig.theme,
    toLevel: <B extends string, O extends string>(batchNumber: B, order: O) =>
      `/${themeConfig.theme}/levels/${batchNumber}/${order}` as const,
    fetchCsv: () =>
      fetch(link(themeConfig.gid).link)
        .then((res) => res.text())
        .catch((e) => {
          console.error("Spreadhseet error", e);
          return "";
        }),
  } as const);

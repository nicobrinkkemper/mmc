const link = <GID extends number>(gid: GID) =>
  ({
    gid,
    link: `https://docs.google.com/spreadsheets/d/e/2PACX-1vROk4rxqS9jPImRfwqL6T6pFHJSBs4Gx3O9JUzabTeDA0aZrr2xccinxeuWhSNJJflByzbE63CAkZj0/pub?gid=${gid}&single=true&output=csv`,
  } as const);

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
}) => {
  const spreadsheet = link(themeConfig.gid);
  return {
    weekTrailers: themeConfig.weekTrailers,
    spreadsheet,
    key: `_${themeConfig.theme}`,
    theme: themeConfig.theme,
    fetchCsv: () =>
      fetch(spreadsheet.link)
        .then((res) => res.text())
        .catch((e) => {
          console.error("Spreadsheet error", e);
          throw e;
        }),
  } as const;
};

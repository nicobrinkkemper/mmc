const link = <GID extends number>(gid: GID) =>
  ({
    gid,
    link: `https://docs.google.com/spreadsheets/d/e/2PACX-1vROk4rxqS9jPImRfwqL6T6pFHJSBs4Gx3O9JUzabTeDA0aZrr2xccinxeuWhSNJJflByzbE63CAkZj0/pub?gid=${gid}&single=true&output=csv`,
  } as const);

const fetchWithRetry = async (url: string, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(30000),
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.text();
    } catch (e) {
      console.error(`Attempt ${i + 1} failed:`, e);
      if (i === retries - 1) throw e;
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
};

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
    fetchCsv: () => {
      console.log("Fetching CSV", spreadsheet.link);
      return fetchWithRetry(spreadsheet.link)
        .catch((e) => {
          console.error("Failed to fetch CSV:", spreadsheet.link);
          if (e instanceof TypeError) {
            console.error("TypeError", e.message);
          }
          if (e.cause instanceof AggregateError) {
            console.error(e.cause.errors);
          }
          if (e.name === 'AbortError') {
            console.error("Request timed out after 30 seconds");
          }
          throw e;
        });
    },
  } as const;
};

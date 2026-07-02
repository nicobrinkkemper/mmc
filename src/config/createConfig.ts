import { createFetchWithRetry } from "../utils/createFetchWithRetry.js";
import { spreadsheetCsvLink } from "./spreadsheetCsvLink.js";
const link = <GID extends number>(gid: GID) =>
({
  gid,
  link: `${spreadsheetCsvLink}?gid=${gid}&single=true&output=csv`,
} as {
  gid: GID;
  link: `${typeof spreadsheetCsvLink}?gid=${GID}&single=true&output=csv`;
});

let hasErrors = false;

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
      if (hasErrors) {
        console.log(`Not updated ${themeConfig.theme}`);
        return undefined;
      }
      console.log(`Updating ${themeConfig.theme}`);
      return createFetchWithRetry({
        url: spreadsheet.link,
        retries: 3,
        delay: 1000,
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      })
        .then((response) => {
          if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
          hasErrors = false;
          return response.text();
        })
        .catch((e) => {
          console.error(`Failed to fetch CSV for ${themeConfig.theme}`);
          if (e instanceof TypeError) {
            console.error("TypeError", e.message);
          }
          if (e.cause instanceof AggregateError) {
            console.error(e.cause.errors);
          }
          if (e.name === "AbortError") {
            console.error("Request timed out after 30 seconds");
          }
          hasErrors = true;
          throw e;
        });
    },
  } as const;
};

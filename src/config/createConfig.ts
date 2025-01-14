const link = <GID extends number>(gid: GID) =>
  ({
    gid,
    link: `https://docs.google.com/spreadsheets/d/e/2PACX-1vROk4rxqS9jPImRfwqL6T6pFHJSBs4Gx3O9JUzabTeDA0aZrr2xccinxeuWhSNJJflByzbE63CAkZj0/pub?gid=${gid}&single=true&output=csv`,
  } as const);

let hasErrors = false;

// exponential back-off queue
const queue: string[] = [];
function fetchWithRetry(url: string, retries = 3, delay = 1000): Promise<Response> {
  return new Promise((resolve, reject) => {
    const attempt = async (attemptNumber: number) => {
      try {
        const response = await fetch(url, {
          signal: AbortSignal.timeout(30000),
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });
        resolve(response);
      } catch (error) {
        if (attemptNumber === retries) {
          reject(error);
          return;
        }
        // Calculate delay with exponential backoff: delay * 2^attemptNumber
        const backoffDelay = delay * Math.pow(2, attemptNumber);
        console.log(`Retry attempt ${attemptNumber + 1} after ${backoffDelay}ms`);
        setTimeout(() => attempt(attemptNumber + 1), backoffDelay);
      }
    };

    attempt(0);
  });
}

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
      return fetchWithRetry(spreadsheet.link)
        .then(response => {
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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
          if (e.name === 'AbortError') {
            console.error("Request timed out after 30 seconds");
          }
          hasErrors = true;
          throw e;
        });
    },
  } as const;
};

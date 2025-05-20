type FetchWithRetryOptions = {
  url: string;
  retries?: number;
  delay?: number;
  headers?: HeadersInit;
};

export function createFetchWithRetry({
  url,
  retries = 3,
  delay = 1000,
  headers = {},
}: FetchWithRetryOptions): Promise<Response> {
  return new Promise((resolve, reject) => {
    const attempt = async (attemptNumber: number) => {
      try {
        const response = await fetch(url, {
          signal: AbortSignal.timeout(30000),
          headers: headers,
        });
        resolve(response);
      } catch (error) {
        if (attemptNumber === retries) {
          reject(error);
          return;
        }
        // Calculate delay with exponential backoff: delay * 2^attemptNumber
        const backoffDelay = delay * Math.pow(2, attemptNumber);
        console.log(
          `Retry attempt ${attemptNumber + 1} after ${backoffDelay}ms`
        );
        setTimeout(() => attempt(attemptNumber + 1), backoffDelay);
      }
    };

    attempt(0);
  });
}

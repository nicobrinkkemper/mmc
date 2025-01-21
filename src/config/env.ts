/** Get environment variables in a type-safe way */
const getEnv = () => {
  if (typeof import.meta !== "undefined") {
    if (typeof import.meta.env !== "undefined") {
      if (import.meta.env["VITE_BASE_URL"]) {
        return import.meta.env;
      }
    }
  }

  return {
    VITE_BASE_URL: "",
    VITE_PUBLIC_URL: "",
    DEV: false,
    MODE: "production",
    SSR: false,
  };
};

const env = getEnv();

/** Base URL for the application */
export const BASE_URL = env["VITE_BASE_URL"];

/** Public URL path prefix, for example when using gh-pages */
export const PUBLIC_URL = env["VITE_PUBLIC_URL"];

export const DEV = env["DEV"];

/** To support public url, use this instead of BASE_URL */
export const BASE_URL_WITH_PUBLIC_URL = `${BASE_URL}${PUBLIC_URL}`;

export const absoluteUrl = (path: string) =>
  new URL(path, BASE_URL_WITH_PUBLIC_URL).toString();
/** Get environment variables in a type-safe way */
const getEnv = () => {
  if (typeof process !== "undefined" && process.env["VITE_BASE_URL"]) {
    return process.env;
  }

  if (typeof import.meta !== "undefined") {
    return import.meta.env;
  }

  return {
    VITE_BASE_URL: "",
    VITE_PUBLIC_URL: "/",
    DEV: false,
    MODE: "production",
    SSR: false,
  };
};

const env = getEnv();

/** Base URL for the application */
export const BASE_URL = env["VITE_BASE_URL"];

/** Public URL path prefix */
export const PUBLIC_URL = env["VITE_PUBLIC_URL"];

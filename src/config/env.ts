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

export const DEV = env["DEV"];

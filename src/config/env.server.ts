declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly VITE_BASE_URL: string;
      readonly VITE_DEV: string;
      readonly VITE_PROD: string;
      readonly VITE_SSR: string;
      readonly VITE_PUBLIC_ORIGIN: string;
    }
  }
}
/** Base URL for the application */
export const BASE_URL = () => String(process.env.VITE_BASE_URL);
export const DEV = () => Boolean(Number(process.env.VITE_DEV));
export const PROD = () => Boolean(Number(process.env.VITE_PROD));
export const SSR = () => Boolean(Number(process.env.VITE_SSR));
export const PUBLIC_ORIGIN = () => String(process.env.VITE_PUBLIC_ORIGIN);

/** To support public origin, use this instead of BASE_URL */
export const absoluteUrl = (
  path: string,
  withBaseURL: string = BASE_URL(),
  withPublicOrigin: string = PUBLIC_ORIGIN()
) => {
  if (path.startsWith("http") || path.startsWith("//")) {
    return path;
  }
  if (
    !withPublicOrigin ||
    withPublicOrigin === "" ||
    typeof withPublicOrigin !== "string"
  ) {
    if (process.env["NODE_ENV"] === "production") {
      throw new Error("PUBLIC_ORIGIN is not set");
    }
    return baseURL(path, withBaseURL);
  }
  if (path.startsWith(withPublicOrigin)) {
    return path;
  }
  const pathWithBaseURL = baseURL(path, withBaseURL);
  try {
    return new URL(pathWithBaseURL, withPublicOrigin).toString();
  } catch (error) {
    return withPublicOrigin + pathWithBaseURL;
  }
};

export const baseURL = (path: string, withBaseURL: string = BASE_URL()) => {
  if (!withBaseURL || withBaseURL === "") {
    if (process.env["NODE_ENV"] === "production") {
      throw new Error("BASE_URL is not set");
    }
  }
  if (path.startsWith(withBaseURL)) return path;
  if (withBaseURL.endsWith("/")) {
    if (path.startsWith("/")) return withBaseURL + path.slice(1);
    return withBaseURL + path;
  } else if (path.startsWith("/")) {
    return withBaseURL + path;
  }
  return withBaseURL + "/" + path;
};

declare global {
  interface ImportMetaEnv {
    readonly PUBLIC_ORIGIN?: string;
  }
}

/** Base URL for the application */
export const BASE_URL = import.meta.env.BASE_URL;
export const DEV = import.meta.env.DEV;
export const PROD = import.meta.env.PROD;
export const SSR = import.meta.env.SSR;
export const PUBLIC_ORIGIN = import.meta.env.PUBLIC_ORIGIN ?? "";

/** To support public origin, use this instead of BASE_URL */
export const absoluteUrl = (
  path: string,
  withBaseURL: string = BASE_URL,
  withPublicOrigin: string = PUBLIC_ORIGIN
) => {
  console.log("client absoluteUrl", path, withBaseURL, withPublicOrigin);
  const pathWithBaseURL = baseURL(path, withBaseURL);
  try {
    if (withPublicOrigin === "" || typeof withPublicOrigin !== "string")
      return pathWithBaseURL;
    return new URL(pathWithBaseURL, withPublicOrigin).toString();
  } catch (error) {
    return withPublicOrigin + pathWithBaseURL;
  }
};

export const baseURL = (path: string, withBaseURL: string = BASE_URL) => {
  if (path.startsWith("http") || path.startsWith("//")) return path;
  if (path.startsWith(withBaseURL)) return path;
  if (withBaseURL.endsWith("/")) {
    if (path.startsWith("/")) return withBaseURL + path.slice(1);
    return withBaseURL + path;
  } else if (path.startsWith("/")) {
    return withBaseURL + path;
  }
  return withBaseURL + "/" + path;
};

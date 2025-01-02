export const PUBLIC_URL: string =
  typeof import.meta?.env !== "undefined"
    ? import.meta?.env?.["VITE_PUBLIC_URL"]
    : // @ts-ignore for portability
      process?.env?.["VITE_PUBLIC_URL"] ?? "/";

export const BASE_URL: string =
  typeof import.meta?.env !== "undefined"
    ? import.meta.env?.["VITE_BASE_URL"]
    : // @ts-ignore for portability
      process?.env?.["VITE_BASE_URL"] ?? "";

export const BASE_URL_WITH_PUBLIC_URL: string =
  BASE_URL +
  (PUBLIC_URL !== ""
    ? PUBLIC_URL.startsWith("/")
      ? PUBLIC_URL
      : "/" + PUBLIC_URL
    : "");
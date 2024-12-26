export const PUBLIC_URL =
  typeof import.meta?.env !== "undefined"
    ? import.meta?.env?.["VITE_PUBLIC_URL"]
    : // @ts-ignore for portability
      process?.env?.["VITE_PUBLIC_URL"] ?? "/";

export const BASE_URL =
  typeof import.meta?.env !== "undefined"
    ? import.meta.env?.["VITE_BASE_URL"]
    : // @ts-ignore for portability
      process?.env?.["VITE_BASE_URL"] ?? "";

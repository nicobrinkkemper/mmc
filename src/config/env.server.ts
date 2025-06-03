import {
  createAbsoluteURL,
  createBaseURL,
} from "vite-plugin-react-server/utils";

declare global {
  interface ImportMetaEnv {
    PUBLIC_ORIGIN: string;
    BASE_URL: string;
    NODE_ENV: string;
    DEV: boolean;
    PROD: boolean;
  }
  interface ProcessEnv {
    VITE_PUBLIC_ORIGIN: string;
    VITE_BASE_URL: string;
    VITE_NODE_ENV: string;
    VITE_DEV: string;
    VITE_PROD: string;
  }
}

export const absoluteURL = createAbsoluteURL(
  process.env["VITE_BASE_URL"] ?? "/",
  process.env["VITE_PUBLIC_ORIGIN"] ?? "https://mmcelebration.com"
);
export const baseURL = createBaseURL(process.env["VITE_BASE_URL"] ?? "/");

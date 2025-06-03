import {
  createAbsoluteURL,
  createBaseURL,
} from "vite-plugin-react-server/utils";

declare global {
  interface ImportMetaEnv {
    PUBLIC_ORIGIN: string;
  }
}

export const absoluteURL = createAbsoluteURL(
  import.meta.env.BASE_URL ?? "/",
  import.meta.env.PUBLIC_ORIGIN ?? "https://mmcelebration.com"
);
export const baseURL = createBaseURL(import.meta.env.BASE_URL ?? "/");

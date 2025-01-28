import React from "react";
import type { Options } from "./types.js";
// Default configuration values
export const DEFAULT_CONFIG = {
  FILE_REGEX: /\.(m|c)?(j|t)sx?$/,
  SERVER_OUT_DIR: "dist/server",
  CLIENT_OUT_DIR: "dist/client",
  RSC_DIR: "rsc",
  MODULE_BASE: "src",
  MODULE_BASE_URL: "/src",
  PAGE: "/src/page/page.tsx",
  PROPS: "/src/page/props.ts",
  CLIENT_ENTRY: "/src/client.tsx",
  PAGE_EXPORT: "Page",
  PROPS_EXPORT: "props",
  // relative from plugin root
  WORKER_PATH: "worker/worker.tsx",
  LOADER_PATH: "worker/loader.ts",
  RSC_EXTENSION: ".rsc",
  HTML: React.Fragment,
  COLLECT_CSS: true,
  COLLECT_ASSETS: true,
  PAGE_PATTERN: "/src/page/**/*.page.tsx",
  PROPS_PATTERN: "/src/page/**/*.props.ts",
  DEV_PORT: 5173,
  PREVIEW_PORT: 4173,
  DEV_HOST: "localhost",
  PREVIEW_HOST: "localhost",
  ENV_PREFIX: "VITE_",
  BUILD: {
    pages: [],
  },
} as const;

export const resolveOptions = async (
  options: Options,
  dir: string = process.cwd()
) => {
  return {
    moduleBase: options.moduleBase ?? DEFAULT_CONFIG.MODULE_BASE,
    moduleBasePath:
      options.moduleBasePath ?? options.moduleBase?.startsWith("/")
        ? options.moduleBase
        : `/${options.moduleBase}`,
    Page: options.Page ?? DEFAULT_CONFIG.PAGE,
    props: options.props ?? DEFAULT_CONFIG.PROPS,
    Html: options.Html ?? DEFAULT_CONFIG.HTML,
    pageExportName: options.pageExportName ?? DEFAULT_CONFIG.PAGE_EXPORT,
    propsExportName: options.propsExportName ?? DEFAULT_CONFIG.PROPS_EXPORT,
    collectCss: options.collectCss ?? DEFAULT_CONFIG.COLLECT_CSS,
    collectAssets: options.collectAssets ?? DEFAULT_CONFIG.COLLECT_ASSETS,
  };
};

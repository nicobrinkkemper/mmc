import type React from "react";
import type { ComponentType } from "react";
import type { Connect, Manifest, ViteDevServer } from "vite";
import { DefaultHtml } from "./DefaultHtml.js";

// Default configuration values
export const DEFAULT_CONFIG = {
  OUT_DIR: 'dist',
  SERVER_DIR: 'server',
  RSC_DIR: 'rsc',
  MODULE_BASE: '/src',
  PAGE_EXPORT: 'Page',
  PROPS_EXPORT: 'props',
  WORKER_PATH: 'dist/rsc-worker.js',
  HTML: DefaultHtml
} as const;

export type ModuleLoader = (path: string) => Promise<Record<string, any>>;

export type BaseProps = { manifest?: Manifest };

export type StreamResult =
  | {
      type: "success";
      stream: ReturnType<
        typeof import("react-server-dom-esm/server.node").renderToPipeableStream
      >;
    }
  | { type: "error"; error: unknown };

export type RscStreamParams<T extends BaseProps = BaseProps> = {
  url: string;
  controller: AbortController;
  server?: ViteDevServer;
  loader: ModuleLoader;
  Html: ComponentType<T>;
  options: Options;
  pageExportName: string;
  propsExportName: string;
};

export interface RouteConfig {
  path: string;
  // Define page/props paths using patterns
  pattern?: {
    page?: string; // e.g. "page/_theme/[route]/page"
    props?: string; // e.g. "page/_theme/[route]/props"
  };
  // Or use explicit paths
  paths?: {
    page: string; // e.g. "page/home/page"
    props: string; // e.g. "page/home/props"
  };
}

export interface BuildConfig<T extends BaseProps> {
  routes?: RouteConfig[];
  output?: {
    dir?: string;
    rsc?: string;
    worker?: string; // Path to the worker script
  };
  pages: () => (Promise<string[]> | string[]);
  options?: Options;
  server?: ViteDevServer;
}

export interface RscResolver {
  /**
   * Get RSC data for static generation
   * @param path - Route path (e.g. "/", "/about")
   */
  getRscData: (path: string) => Promise<{
    Page: React.ComponentType;
    props: any;
  }>;
}

export interface Options {
  moduleBase: string;
  Html?: React.ComponentType<React.PropsWithChildren<{ manifest: Manifest }>>;
  Page: string | ((url: string) => string);
  props: string | ((url: string) => string);
  pageExportName?: string;
  propsExportName?: string;
  moduleLoader?: (server: ViteDevServer) => ModuleLoader;
  build?: BuildConfig<BaseProps>;
  outDir?: string;  // defaults to 'dist'
}

export type RequestHandler = Connect.NextHandleFunction;

export interface SsrStreamOptions {
  bootstrapModules?: string[];
  bootstrapScripts?: string[];
  bootstrapScriptContent?: string;
  signal?: AbortSignal;
  identifierPrefix?: string;
  namespaceURI?: string;
  nonce?: string;
  progressiveChunkSize?: number;
  onShellReady?: () => void;
  onAllReady?: () => void;
  onError?: (error: unknown) => void;
  importMap?: {
    imports?: Record<string, string>;
  };
}

export type RscServerConfig = {
  /** How to get RSC data (e.g. HTTP, direct import, etc) */
  getRscComponent: (url: string) => React.Usable<React.ReactNode>;
  /** Base URL for client assets */
  clientBase?: string;
  /** SSR stream rendering options */
  ssrOptions?: SsrStreamOptions;
};

export interface RscServerModule {
  /**
   * Get RSC data for a route
   * @param path - Route path (e.g. "/", "/about")
   * @returns Page component and props
   */
  getRscData: (path: string) => Promise<{
    /** Page component to render */
    Page: React.ComponentType;
    /** Props to pass to the page */
    props: any;
  }>;
}

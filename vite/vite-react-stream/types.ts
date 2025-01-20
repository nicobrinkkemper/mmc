import React from "react";
import type { PipeableStream } from "react-dom/server.node";
import type { Connect, Logger, Manifest, ViteDevServer } from "vite";

export interface StreamPluginOptions {
  moduleBase: string;
  moduleBaseURL?: string;
  clientEntry?: string;
  // Auto-discovery (zero-config)
  autoDiscover?: {
    pagePattern?: string;
    propsPattern?: string;
  };
  // Manual configuration
  Page: string | ((url: string) => string);
  props?: string | ((url: string) => string);
  // Escape hatches
  workerPath?: string;
  loaderPath?: string;
  pageExportName?: string;
  propsExportName?: string;
  Html?: React.ComponentType<React.PropsWithChildren<{ manifest: Manifest }>>;
  collectCss?: boolean;
  collectAssets?: boolean;
  build?: BuildConfig;
}



// Default configuration values
export const DEFAULT_CONFIG = {
  OUT_DIR: 'dist',
  SERVER_DIR: 'server',
  RSC_DIR: 'rsc',
  MODULE_BASE: 'src',
  MODULE_BASE_URL: '/src',
  PAGE: '/src/page/page.tsx',
  PROPS: '/src/page/props.ts',
  CLIENT_ENTRY: '/src/client.tsx',
  PAGE_EXPORT: 'Page',
  PROPS_EXPORT: 'props',
  WORKER_PATH: 'worker/index.ts',
  LOADER_PATH: 'worker/loader.ts',
  RSC_EXTENSION: '.rsc',
  HTML: React.Fragment,
  COLLECT_CSS: true,
  COLLECT_ASSETS: true,
  PAGE_PATTERN: '/src/page/**/*.page.tsx',
  PROPS_PATTERN: '/src/page/**/*.props.ts',
} as const;

export type ModuleLoader = (url: string, context?: any, defaultLoad?: any) => Promise<Record<string, any>>;

export interface BaseProps {
  manifest: Manifest;
  children?: React.ReactNode;
  assets?: {
    css?: string[];
  };
}


export type StreamResult =
  | {
    type: "success"; 
    stream: PipeableStream;
    assets?: {
      css?: string[];
    };
    }
  | { type: "error"; error: unknown }
  | { type: "skip" };

export interface RscStreamOptions {
  url: string;
  controller: AbortController;
  loader: ModuleLoader;
  moduleBase: string;
  pagePath: string;
  propsPath?: string;
  pageExportName: string;
  propsExportName: string;
  Html: any;
  temporaryReferences: WeakMap<any, string>;
  logger: Console | Logger;
  cssFiles?: string[];
}

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

export interface BuildConfig {
  routes?: RouteConfig[];
  output?: {
    dir?: string;
    rsc?: string;
    ext?: string;
    worker?: string;
    static?: string;
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
  props?: string | ((url: string) => string);
  pageExportName?: string;
  propsExportName?: string;
  collectCss?: boolean;
  collectAssets?: boolean;
  emitCss?: boolean;
  moduleLoader?: (server: ViteDevServer) => ModuleLoader;
  build?: BuildConfig;
  outDir?: string;  // defaults to 'dist'
  /** 
   * Configure static asset copying
   * - true: Copy all assets
   * - false: Don't copy assets
   * - Function: Custom filter for which files to copy
   */
  copyAssets?: boolean | ((file: string) => boolean);
}

export type RequestHandler = Connect.NextHandleFunction;

export interface SsrStreamOptions {
  url: string;
  controller: AbortController;
  loader: (id: string) => Promise<any>;
  Html: any;
  options: StreamPluginOptions;
  pageExportName: string;
  propsExportName: string;
  moduleGraph: any;
  bootstrapModules?: string[];
  importMap?: Record<string, string[]>;
  clientComponents?: boolean;
  onlyClientComponents?: boolean;
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

// serializable options for createFromNodeStream
export interface CreateFromNodeStreamOptions {
  encodeFormAction?: boolean;
  nonce?: string;
 // findSourceMapURL?: (source: string) => string | undefined;
  replayConsoleLogs?: boolean;
  environmentName?: string;
  moduleLoading?: string | {
    prefix: string;
    crossOrigin?: string;
  };
}

export interface RegisterComponentMessage {
  type: 'REGISTER_COMPONENT';
  id: string;
  code: string;
}

export interface RenderMessage {
  type: 'RENDER';
  stream: string;
  moduleBasePath: string;
  moduleBaseURL: string;
  pipableStreamOptions: {
    bootstrapModules: string[];
  };
  clientComponents: Record<string, string>;
}
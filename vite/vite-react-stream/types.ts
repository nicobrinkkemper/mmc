import type { ComponentType } from "react";
import type { Connect, Manifest, ViteDevServer } from "vite";

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

export type RscStreamParams<T extends BaseProps> = {
  url: string;
  controller: AbortController;
  server?: ViteDevServer;
  loader: ModuleLoader;
  Layout: ComponentType<T>;
  options: Options<T>;
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
  output?: { dir?: string; rsc?: string };
  pages: string;
  options?: Options<T>;
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

export type Options<T extends BaseProps = BaseProps> = {
  /** Layout component that wraps the page */
  Html?: ComponentType<T>;
  /** Resolves the path to the page component */
  Page: string | ((url: string) => string);
  /** Resolves the path to the props module */
  props: string | ((url: string) => string);
  /** Custom module loader function */
  moduleLoader?: (server: ViteDevServer) => ModuleLoader;
  /** Base module directory (usually "src") */
  moduleBase?: string;
  /** Name of the props export */
  propsExportName?: string;
  /** Name of the page component export */
  pageExportName?: string;
  /** Build configuration */
  build?: BuildConfig<T>;
};

export type RequestHandler = Connect.NextHandleFunction;

export type RscServerConfig = {
  /** How to get RSC data (e.g. HTTP, direct import, etc) */
  getRscComponent: (url: string) => Promise<React.ReactNode>;
  /** Base URL for client assets */
  clientBase?: string;
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

declare module "react-dom/server.node" {
  interface RenderToPipeableStreamOptions {
    identifierPrefix?: string;
    namespaceURI?: string;
    nonce?: string;
    bootstrapScriptContent?: string;
    bootstrapScripts?: string[];
    bootstrapModules?: string[];
    progressiveChunkSize?: number;
    signal?: AbortSignal;
    onShellReady?: () => void;
    onAllReady?: () => void;
    onError?: (error: unknown) => void;
    unstable_externalRuntimeSrc?: string | boolean;
    importMap?: {
      imports?: Record<string, string>;
    };
  }

  interface PipeableStream {
    /**
     * Pipes the RSC stream to a destination
     * @param destination The writable stream to pipe to
     * @param options Pipe options (e.g. { end: false } to keep stream open)
     * @returns The destination stream for chaining
     */
    pipe: (
      destination: NodeJS.WritableStream,
      options?: { end?: boolean }
    ) => NodeJS.WritableStream & {
      on(
        event: "drain" | "error" | "close" | "end",
        listener: (...args: any[]) => void
      ): void;
    };

    /**
     * Aborts the RSC stream
     * @param reason Optional reason for abortion
     */
    abort: (reason?: any) => void;
  }

  export function renderToPipeableStream(
    element: React.ReactElement,
    options?: RenderToPipeableStreamOptions
  ): PipeableStream;
}

declare module "react-server-dom-esm/server.node" {
  /**
   * Error handling in RSC Server:
   * - onError: Called for any errors during rendering
   * - onPostpone: Called when rendering is postponed
   *
   * Note: onShellError is part of react-dom/server.node, not RSC
   */
  type RSCErrorHandling = {
    onError?: (error: unknown) => void;
    onPostpone?: (reason: unknown) => void;
  };

  interface RequestInstanceOptions {
    identifierPrefix?: string;
    onError?: (error: unknown) => void;
    onPostpone?: (reason: unknown) => void;
    temporaryReferences?: WeakMap<any, string>;
    environmentName?: string;
    filterStackFrame?: (frame: string) => boolean;
  }

  interface PipeableStream {
    /**
     * Pipes the RSC stream to a destination
     * @param destination The writable stream to pipe to
     * @param options Pipe options (e.g. { end: false } to keep stream open)
     * @returns The destination stream for chaining
     */
    pipe: (
      destination: NodeJS.WritableStream,
      options?: { end?: boolean }
    ) => NodeJS.WritableStream & {
      on(
        event: "drain" | "error" | "close" | "end",
        listener: (...args: any[]) => void
      ): void;
    };

    /**
     * Aborts the RSC stream
     * @param reason Optional reason for abortion
     */
    abort: (reason?: any) => void;
  }

  interface PrerenderedStream {
    prelude: NodeJS.ReadableStream;
  }

  /**
   * Creates a pipeable stream of RSC data
   * @param model React elements to render
   * @param moduleBasePath Base path for client components (used for module resolution)
   * @param options Configuration options
   *
   * @source Based on react-server-dom-esm-server.node.development.js:
   * exports.renderToPipeableStream = function (model, moduleBasePath, options)
   */
  export function renderToPipeableStream(
    model: React.ReactNode,
    moduleBasePath: string,
    options?: RequestInstanceOptions
  ): PipeableStream;

  export function prerenderToNodeStream(
    model: React.ReactNode,
    moduleBasePath: string,
    options?: RequestInstanceOptions
  ): Promise<PrerenderedStream>;

  export function createTemporaryReferenceSet(): WeakMap<any, string>;

  export function registerClientReference(
    proxyImplementation: any,
    id: string,
    exportName: string
  ): any;

  export function registerServerReference(
    reference: any,
    id: string,
    exportName: string
  ): any;

  export function decodeReply(
    body: string | FormData,
    moduleBasePath: string,
    options?: { temporaryReferences?: WeakMap<any, string> }
  ): Promise<any>;
}

declare module "react-server-dom-esm/node-loader" {
  interface LoadResult {
    format: string;
    source: string;
    shortCircuit?: boolean;
  }

  interface ResolveResult {
    url: string;
    format?: string;
    shortCircuit?: boolean;
  }

  export function resolve(
    specifier: string,
    context: {
      conditions: string[];
      parentURL?: string;
      [key: string]: any;
    },
    defaultResolve: Function
  ): Promise<ResolveResult>;

  export function load(
    url: string,
    context: { format: string },
    defaultLoad: Function
  ): Promise<LoadResult>;

  export function getSource(
    url: string,
    context: any,
    defaultGetSource: Function
  ): Promise<{ source: string }>;

  export function transformSource(
    source: string,
    context: any,
    defaultTransformSource: Function
  ): Promise<{ source: string }>;
}

declare module "acorn-loose" {
  export function parse(
    input: string,
    options?: {
      ecmaVersion?: string | number;
      sourceType?: "module" | "script";
      locations?: boolean;
      onComment?: Function;
    }
  ): any;
}

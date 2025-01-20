/// <reference types="react-dom/server" />

declare module "react-server-dom-esm/server.node" {
  interface RequestInstanceOptions {
    onError?: (error: unknown) => void;
    identifierPrefix?: string;
    onPostpone?: (reason: unknown) => void;
    temporaryReferences?: WeakMap<any, string>;
    environmentName?: string;
    filterStackFrame?: (frame: string) => boolean;
    signal?: AbortSignal;
  }

  interface PipeableStream {
    abort: (reason?: unknown) => void;
    pipe: <Writable extends NodeJS.WritableStream>(
      destination: Writable
    ) => Writable & {
      on(event: "drain", listener: () => void): void;
      on(event: "error", listener: (error: Error) => void): void;
      on(event: "close", listener: () => void): void;
      on(event: "data", listener: (chunk: Uint8Array | string) => void): void;
      on(event: "end", listener: () => void): void;
    };
  }

  export function renderToPipeableStream(
    model: React.ReactNode,
    moduleBasePath: string,
    options?: RequestInstanceOptions
  ): PipeableStream;

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

  export function createTemporaryReferenceSet(): WeakMap<any, string>;

  export function decodeReply(
    body: string | FormData,
    moduleBasePath: string,
    options?: { temporaryReferences?: WeakMap<any, string> }
  ): Promise<any>;

  export function decodeReplyFromBusboy(
    busboyStream: any,
    moduleBasePath: string,
    options?: { temporaryReferences?: WeakMap<any, string> }
  ): Promise<any>;

  export function decodeAction(
    body: FormData,
    serverManifest: any
  ): Promise<((formData: FormData) => Promise<any>) | null>;

  export function decodeFormState(
    actionResult: any,
    body: FormData,
    serverManifest: any
  ): Promise<[any, string, string, number] | null>;
}

declare module "react-server-dom-esm/node-loader" {
  interface LoadContext {
    format: string;
    conditions?: string[];
    importAssertions?: Record<string, string>;
  }

  export function resolve(
    specifier: string,
    context: { conditions: string[]; parentURL?: string },
    defaultResolve: Function
  ): Promise<{ url: string }>;

  export function load(
    url: string,
    context: LoadContext,
    defaultLoad: Function
  ): Promise<{ format: string; source: string }>;

  export function transformSource(
    source: string,
    context: LoadContext & { url: string },
    defaultTransformSource: Function
  ): Promise<{ source: string }>;
}

declare module "react-server-dom-esm/client.node" {
  interface CreateFromNodeStreamOptions {
    encodeFormAction?: boolean;
    nonce?: string;
    findSourceMapURL?: (source: string) => string | undefined;
    replayConsoleLogs?: boolean;
    environmentName?: string;
    moduleLoading?:
      | string
      | {
          prefix: string;
          crossOrigin?: string;
        };
  }

  export function createFromNodeStream<T>(
    stream: import("node:stream").Readable,
    moduleRootPath: string,
    moduleBaseURL: string,
    options?: CreateFromNodeStreamOptions
  ): React.Usable<T>;

  export * from "react-server-dom-esm/client.browser";
}

declare module "react-dom/server.node" {
    interface PipeableStreamOptions {
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

    interface PipeableStream {
        pipe: (destination: NodeJS.WritableStream) => NodeJS.WritableStream;
        abort: (reason?: any) => void;
    }

    export function renderToPipeableStream(
        children: React.ReactNode,
        options?: PipeableStreamOptions
    ): PipeableStream;

    export function resumeToPipeableStream(
        children: React.ReactNode,
        postponedState: object,
        options?: PipeableStreamOptions
    ): PipeableStream;

    export const version: string;
} 
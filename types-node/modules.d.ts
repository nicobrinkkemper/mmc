type ReactDOMServer = typeof import("react-dom/server");

declare module "react-server-dom-esm/server.node" {
  export function renderToPipeableStream(
    element: React.ReactElement,
    options?: string
  ): ReactDOMServer.PipeableStream;
}

declare module "react-dom/server.node" {
  export function renderToPipeableStream(
    element: React.ReactElement,
    options?: ReactDOMServer.RenderToPipeableStreamOptions & {
      importMap?: Record<string, Record<string, string>>;
    }
  ): ReactDOMServer.PipeableStream;
}

declare module "react-server-dom-esm/client" {
  export function createFromNodeStream(
    stream: import("node:stream").Readable,
    baseUrl: string,
    moduleBaseUrl: string
  ): React.Usable<React.ReactNode>;
}

declare module "react-server-dom-esm/node-loader" {
  export function getSource(url: string): string;
  export function load(url: string): string;
  export function resolve(url: string): string;
  export function transformSource(source: string): string;
}

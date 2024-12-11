declare module "react-server-dom-esm/client.node" {
  export function createFromNodeStream(
    stream: any,
    base: string,
    url: string
  ): any;
}

declare module "react-server-dom-esm/server.node" {
  export function renderToPipeableStream(
    element: React.ReactElement,
    options?: any
  ): any;
  export function decodeReply(body: any, base: string): Promise<any>;
  export function decodeReplyFromBusboy(bb: any, base: string): Promise<any>;
}

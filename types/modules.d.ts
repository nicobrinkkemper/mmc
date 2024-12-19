/**
 * Type declarations for react-server-dom-esm-client
 */

declare module "react-server-dom-esm/client" {
  /**
   * Options for creating a client response
   */
  interface ClientResponseOptions {
    /** Base URL for resolving modules */
    moduleBaseURL?: string;
    /** Custom server call implementation */
    callServer?: (id: string, args: unknown[]) => Promise<unknown>;
    /** Temporary reference set for object deduplication */
    temporaryReferences?: Map<string, unknown>;
    /** Function to find source map URLs */
    findSourceMapURL?: (url: string, env: string) => string | null;
    /** Whether to replay console logs (defaults to true) */
    replayConsoleLogs?: boolean;
    /** Environment name */
    environmentName?: string;
  }

  /**
   * Options for encoding replies
   */
  interface EncodeReplyOptions {
    /** Temporary reference set for object deduplication */
    temporaryReferences?: Map<string, unknown>;
    /** AbortSignal for cancellation */
    signal?: AbortSignal;
  }

  /**
   * Creates a response from a fetch request
   */
  export function createFromFetch(
    promiseForResponse: Promise<Response>,
    options?: ClientResponseOptions
  ): Promise<unknown>;

  /**
   * Creates a response from a ReadableStream
   */
  export function createFromReadableStream(
    stream: ReadableStream,
    options?: ClientResponseOptions
  ): Promise<unknown>;

  /**
   * Creates a server reference
   */
  export function createServerReference(
    id: string,
    callServer: (id: string, args: unknown[]) => Promise<unknown>
  ): (...args: unknown[]) => Promise<unknown>;

  /**
   * Creates a temporary reference set for object deduplication
   */
  export function createTemporaryReferenceSet(): Map<string, unknown>;

  /**
   * Encodes a reply to send to the server
   */
  export function encodeReply(
    value: unknown,
    options?: EncodeReplyOptions
  ): Promise<FormData>;
}
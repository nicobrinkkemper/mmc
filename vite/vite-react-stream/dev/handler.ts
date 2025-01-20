import { IncomingMessage, ServerResponse } from "http";
import type { ViteDevServer } from "vite";
import { createLogger } from "vite";
import { createHandler } from "../createHandler.js";
import {
  type RequestHandler,
  type StreamPluginOptions
} from "../types.js";

/**
 * Creates a request handler for development
 */
export function createDevHandler(
  server: ViteDevServer,
  options: StreamPluginOptions,
): RequestHandler {
  return async (req: IncomingMessage, res: ServerResponse, next: any) => {
    // Skip non-page requests
    if (!req.url || req.url.includes(".")) {
      return next();
    }

    try {
      console.log("[stream] Handling RSC stream");
      
      const result = await createHandler(options, {
        url: req.url ?? "",
        loader: server.ssrLoadModule,
        temporaryReferences: new WeakMap(),
        logger: createLogger(),
        moduleGraph: server.moduleGraph
      });

      if (result.type === "error") {
        if ((result.error as Error).message?.includes('module runner has been closed')) {
          console.log("[RSC] Module runner closed, returning 503");
          res.writeHead(503, { 'Content-Type': 'text/x-component' });
          res.end('{"error":"Server restarting..."}');
          return;
        }
        console.error("[RSC] Stream error:", result.error);
        res.writeHead(500, { 'Content-Type': 'text/x-component' });
        res.end('{"error":"Internal Server Error"}');
        return;
      }

      if (result.type !== "success") {
        res.end();
        return;
      }

      res.setHeader("Content-Type", "text/x-component");
      result.stream.pipe(res);
    } catch (error: any) {
      if (error.message?.includes('module runner has been closed')) {
        console.log("[RSC] Module runner closed, returning 503");
        res.writeHead(503, { 'Content-Type': 'text/x-component' });
        res.end('{"error":"Server restarting..."}');
        return;
      }
      next(error);
    }
  };
}

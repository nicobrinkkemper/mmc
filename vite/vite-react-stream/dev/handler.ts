import type { ViteDevServer } from "vite";
import { DefaultLayout } from "../components.js";
import {
  DEFAULT_CONFIG,
  type BaseProps,
  type ModuleLoader,
  type Options,
  type RequestHandler,
} from "../types.js";
import { handleRscStream } from "./rsc.js";

/**
 * Creates a request handler for development
 */
export function createDevHandler<T extends BaseProps>(
  server: ViteDevServer,
  options: Options,
  loader: ModuleLoader
): RequestHandler {
  const Layout = options.Html ?? DefaultLayout;
  const pageExportName = options.pageExportName ?? DEFAULT_CONFIG.PAGE_EXPORT;
  const propsExportName = options.propsExportName ?? DEFAULT_CONFIG.PROPS_EXPORT;

  return async (req, res, next) => {
    // Skip non-page requests
    if (!req.url || req.url.includes(".")) {
      return next();
    }

    try {
      console.log("[stream] Handling RSC stream");
      const result = await handleRscStream({
        url: req.url ?? "",
        controller: new AbortController(),
        server,
        loader,
        Layout: Layout as React.ComponentType<any>,
        options,
        pageExportName,
        propsExportName,
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

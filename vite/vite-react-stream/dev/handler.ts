import type { ViteDevServer } from "vite";
import { DefaultLayout } from "../components";
import type {
  BaseProps,
  ModuleLoader,
  Options,
  RequestHandler,
} from "../types";
import { handleRscStream } from "./rsc";

/**
 * Creates a request handler for development
 */
export function createDevHandler<T extends BaseProps>(
  server: ViteDevServer,
  options: Options<T>,
  loader: ModuleLoader
): RequestHandler {
  const Layout = options.Html ?? DefaultLayout;
  const pageExportName = options.pageExportName ?? "Page";
  const propsExportName = options.propsExportName ?? "props";

  return async (req, res, next) => {
    // Skip non-page requests
    if (!req.url || req.url.includes(".")) {
      return next();
    }

    // Check if this handler can handle the URL
    const pagePath =
      typeof options.Page === "function" ? options.Page(req.url) : options.Page;

    if (!pagePath) {
      return next();
    }

    try {
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
        console.error("[RSC] Stream error:", result.error);
        res.writeHead(500);
        res.end("Internal Server Error");
        return;
      }

      res.setHeader("Content-Type", "text/x-component");
      result.stream.pipe(res);
    } catch (error) {
      next(error);
    }
  };
}

import { DefaultLayout } from "../components";
import type {
  BaseProps,
  ModuleLoader,
  Options,
  RequestHandler,
  RscServerConfig,
} from "../types";
import { handleSsrStream } from "./ssr";

/**
 * Creates a request handler for production
 */
export function createProdHandler<T extends BaseProps>(
  options: Options<T>,
  loader: ModuleLoader,
  rscServer: RscServerConfig
): RequestHandler {
  const Layout = options.Html ?? DefaultLayout;
  const pageExportName = options.pageExportName ?? "Page";
  const propsExportName = options.propsExportName ?? "props";

  return async (req, res, next) => {
    // Skip non-page requests
    if (req.url?.includes(".")) {
      return next();
    }
    try {
      const result = await handleSsrStream({
        url: req.url ?? "",
        controller: new AbortController(),
        loader,
        Layout: Layout as React.ComponentType<any>,
        options,
        pageExportName,
        propsExportName,
        rscServer,
      });

      if (result.type === "error") {
        console.error("[SSR] Stream error:", result.error);
        res.writeHead(500);
        res.end("Internal Server Error");
        return;
      }

      res.setHeader("Content-Type", "text/html");
      result.stream.pipe(res);
    } catch (error) {
      next(error);
    }
  };
}

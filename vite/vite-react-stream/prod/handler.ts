import { DefaultHtml } from "../DefaultHtml.js";
import type {
  ModuleLoader,
  Options,
  RequestHandler,
  RscServerConfig
} from "../types.js";
import { handleSsrStream } from "./ssr.js";

/**
 * Creates a request handler for production
 */
export function createProdHandler(
  options: Options,
  loader: ModuleLoader,
  rscServer: RscServerConfig
): RequestHandler {
  const Html = options.Html ?? DefaultHtml;
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
        Html: Html as React.ComponentType<any>,
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

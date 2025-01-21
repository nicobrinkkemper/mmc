import { createLogger } from "vite";
import { createRscStream } from "./createRscStream.js";
import type { RscStreamOptions, StreamPluginOptions } from "./types.js";
import { DEFAULT_CONFIG } from "./types.js";

export function createHandler(
  pluginOptions: StreamPluginOptions,
  streamOptions: Pick<
    RscStreamOptions,
    "loader" | "url" | "temporaryReferences" | "logger" | "cssFiles"
  > & { moduleGraph: any }
) {
  const Html = pluginOptions.Html ?? DEFAULT_CONFIG.HTML;
  const pageExportName =
    pluginOptions.pageExportName ?? DEFAULT_CONFIG.PAGE_EXPORT;
  const propsExportName =
    pluginOptions.propsExportName ?? DEFAULT_CONFIG.PROPS_EXPORT;
  const moduleBase = pluginOptions.moduleBase ?? DEFAULT_CONFIG.MODULE_BASE;

  return createRscStream({
    url: streamOptions.url,
    controller: new AbortController(),
    loader: streamOptions.loader,
    Html,
    pageExportName,
    propsExportName,
    temporaryReferences: streamOptions.temporaryReferences,
    moduleBase,
    pagePath:
      typeof pluginOptions.Page === "function"
        ? pluginOptions.Page(streamOptions.url)
        : pluginOptions.Page,
    propsPath:
      typeof pluginOptions.props === "function"
        ? pluginOptions.props(streamOptions.url)
        : pluginOptions.props,
    logger: streamOptions.logger ?? createLogger(),
    moduleGraph: streamOptions.moduleGraph,
  });
}

import React from "react";
import {
  renderToPipeableStream,
  type PipeableStream,
} from "react-server-dom-esm/server.node";
import { CssCollector } from "../components.js";
import type { RscStreamOptions } from "../types.js";

export function createRscStream(
  streamOptions: RscStreamOptions
): PipeableStream {
  const {
    controller,
    Html,
    Page,
    props,
    moduleBasePath,
    temporaryReferences,
    logger,
    cssFiles,
    route,
    url,
  } = streamOptions;
  return renderToPipeableStream(
    React.createElement(
      Html,
      {
        key: "html",
        pageProps: props,
        moduleBasePath: moduleBasePath,
        route,
        url,
      },
      React.createElement(Page, { key: "page", ...props }),
      ...Array.from(cssFiles ?? []).map((css, index) =>
        React.createElement(CssCollector, {
          key: `css-${index}`,
          url: css,
        })
      )
    ),
    moduleBasePath,
    {
      signal: controller.signal,
      onError: logger?.error ?? console.error,
      onPostpone: logger?.info ?? console.info,
      environmentName: "Server",
    }
  );
}

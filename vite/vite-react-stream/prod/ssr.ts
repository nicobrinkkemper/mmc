"use server";
import { createElement, use } from "react";
import { renderToPipeableStream } from "react-dom/server.node";
import type {
  BaseProps,
  RscServerConfig,
  RscStreamParams,
  StreamResult,
} from "../types.js";

/**
 * Handles SSR streaming in production
 */
export async function handleSsrStream<T extends BaseProps>(
  params: RscStreamParams<T> & { rscServer: RscServerConfig }
): Promise<StreamResult> {
  const { url, controller, Layout, rscServer } = params;

  try {
    const rscComponent = use(rscServer.getRscComponent(url))

    const stream = renderToPipeableStream(
      createElement(Layout, { manifest: {} } as T, rscComponent),
      {
        ...rscServer.ssrOptions,
        bootstrapModules: rscServer.ssrOptions?.bootstrapModules ?? [`${rscServer.clientBase ?? ""}/entry-client.js`],
        signal: rscServer.ssrOptions?.signal ?? controller.signal,
      }
    );

    return { type: "success", stream };
  } catch (error) {
    return { type: "error", error };
  }
}

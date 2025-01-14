"use server";
import { createElement } from "react";
import { renderToPipeableStream } from "react-dom/server.node";
import type {
  BaseProps,
  RscServerConfig,
  RscStreamParams,
  StreamResult,
} from "../types";

/**
 * Handles SSR streaming in production
 */
export async function handleSsrStream<T extends BaseProps>(
  params: RscStreamParams<T> & { rscServer: RscServerConfig }
): Promise<StreamResult> {
  const { url, controller, Layout, rscServer } = params;

  try {
    const rscComponent = await rscServer.getRscComponent(url);

    const stream = renderToPipeableStream(
      createElement(Layout, { manifest: {} } as T, rscComponent),
      {
        bootstrapModules: [`${rscServer.clientBase ?? ""}/entry-client.js`],
        onError(error: unknown) {
          console.error("[SSR] Stream error:", error);
        },
      }
    );

    return { type: "success", stream };
  } catch (error) {
    return { type: "error", error };
  }
}

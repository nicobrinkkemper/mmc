import { join, resolve as resolvePath } from "node:path";
import { Transform } from "node:stream";
import type { Worker } from "node:worker_threads";
import { createHandler } from "../rsc/createHandler.js";
import type { StreamPluginOptions } from "../types.js";
import type {
  WorkerRscChunkMessage,
  WorkerRscEndMessage,
} from "../worker/types.js";

type RenderPagesOptions = {
  projectRoot: string;
  pluginOptions: StreamPluginOptions;
  outDir: string;
  manifest: Record<string, { file: string }>;
  worker: Worker;
  loader: (id: string) => Promise<Record<string, any>>;
};

export async function renderPages(
  routes: string[],
  options: RenderPagesOptions
) {
  const destinationRoot = resolvePath(options.projectRoot, options.outDir);
  const failedRoutes = new Map<string, Error>();
  const moduleBasePath = join(
    destinationRoot,
    options.pluginOptions.moduleBase
  );
  const moduleBaseURL = options.pluginOptions.moduleBase.startsWith("/")
    ? options.pluginOptions.moduleBase
    : "/" + options.pluginOptions.moduleBase;

  const htmlRoot = resolvePath(
    options.projectRoot,
    options.pluginOptions.build?.client ?? options.outDir
  );
  const filesOutputted: string[] = [];

  options.worker.on("message", (msg) => {
    switch (msg.type) {
      case "ERROR":
        console.error("[RenderPages] Worker error:", msg.error);
        break;
      case "WROTE_FILE":
        filesOutputted.push(msg.outputPath);
        if (filesOutputted.length === routes.length) {
          renderPromises.push(
            new Promise<void>((resolve) => {
              options.worker.removeAllListeners();
              options.worker.terminate();
              resolve();
            })
          );
        }
        break;
      default:
        break;
    }
  });
  const handlerOptions = {
    loader: options.loader,
  };

  // Create promises for each route in the batch
  const renderPromises = routes.map(async (route) => {
    try {
      // Wait for handler creation
      const result = await createHandler(
        route,
        options.pluginOptions,
        handlerOptions
      );

      if (result.type !== "success") {
        return;
      }
      const htmlOutputPath = join(htmlRoot, route, "index.html");

      // Create a promise that resolves when the worker completes
      await new Promise<void>((resolve, reject) => {
        // Pipe RSC stream to worker
        const transform = new Transform({
          transform(chunk, _encoding, callback) {
            const buffer = chunk.buffer;
            const transferable = buffer.slice(
              chunk.byteOffset,
              chunk.byteOffset + chunk.byteLength
            );

            // Send raw chunk
            options.worker.postMessage(
              {
                type: "RSC_CHUNK",
                id: route,
                chunk: chunk,
                buffer: transferable,
                moduleBasePath,
                moduleBaseURL,
                htmlOutputPath: htmlOutputPath,
                outDir: options.outDir,
              } satisfies WorkerRscChunkMessage,
              [transferable]
            );
            callback();
          },
          flush(callback) {
            options.worker.postMessage({
              type: "RSC_END",
              id: route,
            } satisfies WorkerRscEndMessage);
            callback();
          },
        });

        // Listen for worker response for this route
        const messageHandler = (msg: any) => {
          if (msg.route === route) {
            if (msg.type === "ERROR") {
              options.worker.removeListener("message", messageHandler);
              reject(new Error(msg.error));
            } else if (msg.type === "WROTE_FILE") {
              options.worker.removeListener("message", messageHandler);
              console.log(`✓ ${msg.route}`);
              resolve();
            }
          }
        };

        options.worker.on("message", messageHandler);
        result.stream?.pipe(transform);
      });
    } catch (error) {
      failedRoutes.set(route, error as Error);
    }
  });

  // Wait for all routes to complete
  await Promise.all(renderPromises);

  if (failedRoutes.size > 0) {
    console.error("[vite-react-stream] Failed routes:", failedRoutes);
  }
}

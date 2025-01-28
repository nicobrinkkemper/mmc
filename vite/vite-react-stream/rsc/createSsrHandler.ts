import { dirname, join, resolve } from "node:path";
import { Writable } from "node:stream";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";
import { type ViteDevServer } from "vite";
import { DEFAULT_CONFIG } from "../options.js";
import type {
  RenderMessage,
  RequestHandler,
  StreamPluginOptions,
} from "../types.js";
import { createHandler } from "./createHandler.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export function createSsrHandler(
  options: StreamPluginOptions,
  server: ViteDevServer,
  clientComponents: Map<string, string>
): RequestHandler {
  const worker = new Worker(
    options?.workerPath
      ? resolve(server.config.root, options?.workerPath)
      : resolve(__dirname, "..", DEFAULT_CONFIG.WORKER_PATH),
    {
      env: {
        NODE_OPTIONS: "--conditions ''",
        VITE_LOADER_PATH: resolve(
          server.config.cacheDir,
          "react-stream/worker/loader.js"
        ),
      },
    }
  );

  return async function handleSsrRequest(req, res, next) {
    if (
      !req.url ||
      req.url.startsWith("/@") ||
      (req.url.includes(".") && !req.url.endsWith(".html"))
    ) {
      return next();
    }

    try {
      const result = await createHandler(req.url ?? "", options, {
        loader: server.ssrLoadModule.bind(server),
      });
      const moduleBase = options.moduleBase ?? DEFAULT_CONFIG.MODULE_BASE;
      const moduleBaseURL = options.moduleBaseURL
        ? options.moduleBaseURL
        : options.moduleBase.startsWith("/")
        ? options.moduleBase
        : "/" + options.moduleBase;
      const moduleBasePath = join(server.config.cacheDir, moduleBase);
      if (result.type !== "success") {
        throw new Error(
          result.type === "error" ? String(result.error) : "Skipped"
        );
      }

      // Collect RSC stream data
      const rscData = await new Promise<string>((resolve, reject) => {
        let data = "";
        if (!result.stream) {
          resolve(data);
          return;
        }
        const writable = new Writable({
          write(chunk, _, callback) {
            data += chunk;
            callback();
          },
          final(callback) {
            resolve(data);
            callback();
          },
        });

        result.stream.pipe(writable);
        writable.on("error", reject);
      });

      // Send to worker for HTML rendering
      worker.postMessage({
        type: "RENDER",
        stream: rscData,
        moduleBasePath: moduleBasePath,
        moduleBaseURL: moduleBaseURL,
        id: req.url,
        clientComponents: Object.fromEntries(clientComponents),
        pipableStreamOptions: {
          bootstrapModules: ["/dist/client.js"],
        },
      } satisfies RenderMessage);

      // Handle worker response
      const html = await new Promise<string>((resolve, reject) => {
        worker.once("message", (msg) => {
          if (msg.type === "ERROR") {
            reject(new Error(msg.error));
          } else {
            resolve(msg.content);
          }
        });
      });

      res.setHeader("Content-Type", "text/html");
      res.end(html);
    } catch (error) {
      next(error);
    }
  };
}

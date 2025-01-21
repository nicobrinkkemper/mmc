import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import type { ServerResponse } from 'node:http';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from "node:url";
import type { NormalizedInputOptions } from 'rollup';
import type { Plugin, PreviewServer, ResolvedConfig, UserConfig, ViteDevServer } from 'vite';
import { build } from 'vite';
import { Worker } from 'worker_threads';
import { createStreamHandler } from './dev/createStreamHandler.js';
import { DEFAULT_CONFIG, type StreamPluginOptions } from './types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

function validateFiles(options: StreamPluginOptions, root: string) {
  const errors: string[] = [];

  // Check if files exist when string paths are provided
  if (typeof options.Page === 'string') {
    const pagePath = resolve(root, options.Page);
    if (!existsSync(pagePath)) {
      errors.push(`Page file not found: ${pagePath}`);
    }
  }

  if (typeof options.props === 'string') {
    const propsPath = resolve(root, options.props);
    if (!existsSync(propsPath)) {
      errors.push(`Props file not found: ${propsPath}`);
    }
  }

  if (errors.length) {
    throw new Error('React Stream Plugin Validation:\n' + errors.join('\n'));
  }
}

const fileRegex = /\.m?[jt]sx?$/;

export function reactStreamPlugin(options: StreamPluginOptions = {} as StreamPluginOptions): Plugin {
  const clientComponents = new Map<string, string>();
  const cssModules = new Set<string>();
  let rootDir: string = process.cwd();
  let cacheDir: string;
  let resolvedConfig: ResolvedConfig;
  let worker: Worker;
  let isRestarting = false;
  let blockRequestsUntil = 0;

  return {
    name: "vite:react-stream",

    // Add virtual module
    resolveId(id) {
      if (id === "virtual:rsc-test") {
        return "\0virtual:rsc-test";
      }
    },

    load(id) {
      if (id === "\0virtual:rsc-test") {
        return 'export default "test"';
      }
    },

    async configureServer(server: ViteDevServer) {
      cacheDir = server.config.cacheDir;

      // Build loader first
      await build({
        build: {
          write: true,
          lib: {
            entry: options?.loaderPath
              ? resolve(rootDir, options?.loaderPath)
              : resolve(__dirname, DEFAULT_CONFIG.LOADER_PATH),
            formats: ["es"],
            fileName: () => "worker/loader.js",
          },
          outDir: resolve(cacheDir, "react-stream"),
          emptyOutDir: false,
        },
      });

      if (server.config.root) {
        rootDir = server.config.root;
      }

      let currentHandler: ReturnType<typeof createStreamHandler> | null = null;
      let isHandlerReady = true;
      const activeStreams = new Set<ServerResponse>();

      // Handle Vite server restarts
      server.watcher.on("change", (path) => {
        if (path.includes("/vite-react-stream/")) {
          console.log("[RSC] 🔧 Plugin changed, preparing for restart:", path);
          isHandlerReady = false;
          currentHandler = null;

          // Close streams with restart message
          for (const res of activeStreams) {
            res.writeHead(503, {
              "Content-Type": "text/x-component",
              "Retry-After": "1",
            });
            res.end('{"error":"Server restarting..."}');
          }
          activeStreams.clear();
        }
      });

      // Handle HMR file changes
      server.watcher.on("change", (path) => {
        // send signal to hot client to start a new stream for the current route
        // TODO: implement
      });

      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith("/")) return next();
        if (req.headers.accept !== "text/x-component") return next();

        // Add to active streams for HMR
        console.log("[RSC] ➕ Adding stream for:", req.url);
        activeStreams.add(res);

        try {
          if (!currentHandler) {
            console.log("[RSC] 🔄 Creating new stream handler");
            currentHandler = createStreamHandler(server, options);
          }
          await currentHandler(req, res, next);
        } finally {
          res.on("close", () => {
            console.log("[RSC] ➖ Stream closed for:", req.url);
            activeStreams.delete(res);
          });
        }
      });

      return () => {
        // Rest of server setup...
      };
    },

    async transform(code, id) {
      // Handle client components only
      if (fileRegex.test(id) && code?.trimStart().startsWith('"use client"')) {
        clientComponents.set(id, code);
        if (worker) {
          worker.postMessage({
            type: "REGISTER_COMPONENT",
            id,
            code,
          });
        }
      }
      return null;
    },

    config(config): UserConfig {
      if (config?.root) {
        rootDir = config.root;
      }
      return {
        worker: {
          format: "es",
          rollupOptions: {
            input: {
              "worker/index": options?.workerPath
                ? resolve(rootDir, options?.workerPath)
                : resolve(__dirname, DEFAULT_CONFIG.WORKER_PATH),
              "worker/loader": options?.loaderPath
                ? resolve(rootDir, options?.loaderPath)
                : resolve(__dirname, DEFAULT_CONFIG.LOADER_PATH),
            },
            output: {
              format: "esm",
              dir: resolve(config.cacheDir ?? ".vite", "react-stream"),
              entryFileNames: "[name].js",
              preserveModules: false,
            },
          },
        },
      } as UserConfig;
    },
    configResolved(config) {
      resolvedConfig = config;
      validateFiles(options, config.root);
    },
    configurePreviewServer(server: PreviewServer) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          if (!req.url || req.url.includes(".")) return next();

          try {
            const html = await import(
              resolve(server.config.root, `dist${req.url}/index.html`)
            );
            res.setHeader("Content-Type", "text/html");
            res.end(html.default);
          } catch (e) {
            next(e);
          }
        });
      };
    },
    async buildStart(inputOptions: NormalizedInputOptions) {
      // if (inputOptions.input) {
      //   // Initialize worker for build
      //   worker = new Worker(resolve(resolvedConfig.cacheDir, 'react-stream/worker/index.js'));
      //   const userPages = await Promise.resolve(options.build?.pages() ?? []);
      //   for (const route of userPages) {
      //     // TODO: Build implementation
      //   }
      // }
    },
    async buildEnd() {
      if (!options.collectCss) return;

      const cssManifest = Array.from(cssModules).map((file) => {
        const relativePath = file.replace(rootDir, "").replace(/^\//, "");
        return relativePath;
      });

      // Write CSS manifest for SSR
      const manifestPath = resolve(
        resolvedConfig.build.outDir,
        "server/css-manifest.json"
      );
      mkdirSync(dirname(manifestPath), { recursive: true });
      writeFileSync(manifestPath, JSON.stringify(cssManifest, null, 2));
    },
    handleHotUpdate({ file }) {
      if (file.endsWith(".css")) {
        cssModules.add(file);
      }
    },
  };
}

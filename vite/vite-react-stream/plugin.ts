import { readFileSync } from "node:fs";
import type { ServerResponse } from "node:http";
import { resolve as resolvePath } from "node:path";
import { performance } from "node:perf_hooks";
import { Worker } from "node:worker_threads";
import type { Plugin as RollupPlugin } from "rollup";
import type { Plugin as VitePlugin } from "vite";
import {
  createLogger,
  type ResolvedConfig,
  type UserConfig,
  type ViteDevServer,
} from "vite";
import { createBuildConfig } from "./build/createBuildConfig.js";
import { checkFilesExist } from "./checkFilesExist.js";
import { getEnv } from "./getEnv.js";
import { createPageLoader } from "./html/createPageLoader.js";
import { renderPages } from "./html/renderPages.js";
import { createHandler } from "./rsc/createHandler.js";
import type { BuildTiming, ReactStreamPluginMeta } from "./types.js";
import { type StreamPluginOptions } from "./types.js";
import { createWorker } from "./worker/createWorker.js";

let pageSet: Set<string>;
let pageMap: Map<string, string>;
let propsSet: Set<string>;
let propsMap: Map<string, string>;
let entries: string[];
let worker: Worker;
let config: ResolvedConfig;
let rootDir: string;
let cssModules = new Set<string>();
let clientComponents = new Map<string, string>();
let define: Record<string, string>;
let envPrefix: string;
let env: Record<string, string>;

interface BuildStats {
  htmlFiles: number;
  clientComponents: number;
  cssFiles: number;
  totalRoutes: number;
  timing: {
    config: number;
    build: number;
    render: number;
    total: number;
  };
}

export async function reactStreamPlugin(
  options: StreamPluginOptions = {} as StreamPluginOptions
): Promise<VitePlugin & RollupPlugin & { meta: ReactStreamPluginMeta }> {
  const timing: BuildTiming = {
    start: performance.now(),
  };

  rootDir = options.projectRoot ?? process.cwd();
  return {
    name: "vite:react-stream",
    meta: {} as ReactStreamPluginMeta,

    configResolved(resolvedConfig) {
      config = resolvedConfig;
      if (config.command === "build") {
        timing.configResolved = performance.now();
        console.log("[RSC] Starting build...");
      }
      console.log("[RSC] Output directories:", {
        server: config.build.outDir,
      });
    },
    async configureServer(server: ViteDevServer) {
      if (server.config.root) {
        rootDir = server.config.root;
      }
      console.log("RSC CONFIGURE SERVER CALLED");

      const activeStreams = new Set<ServerResponse>();

      // Handle Vite server restarts
      server.ws.on("restart", (path) => {
        console.log("[RSC] 🔧 Plugin changed, preparing for restart:", path);

        // Close streams with restart message
        for (const res of activeStreams) {
          res.writeHead(503, {
            "Content-Type": "text/x-component",
            "Retry-After": "1",
          });
          res.end('{"error":"Server restarting..."}');
        }
        activeStreams.clear();
      });

      server.ws.on("connection", (socket, req) => {
        console.log("RSC WS CONNECTION CALLED");
      });

      server.ws.on("listening", () => {
        console.log("RSC WS LISTENING CALLED");
      });

      server.middlewares.use(async (req, res, next) => {
        if (req.headers.accept !== "text/x-component") return next();
        console.log("RSC MIDDLEWARE CALLED");
        try {
          const handler = await createHandler(
            req.url ?? "",
            {
              ...options,
              // stream only the page - since the html is already rendered by now in the browser
              Html: ({ children }) => children,
            },
            {
              cssFiles: Array.from(cssModules),
              logger: createLogger(),
              loader: server.ssrLoadModule,
            }
          );
          handler?.stream?.pipe(res);
        } finally {
          res.on("close", () => {
            console.log("[RSC] ➖ Stream closed for:", req.url);
            activeStreams.delete(res);
          });
        }
      });
    },

    async config(config, configEnv): Promise<UserConfig> {
      if (config?.root) {
        rootDir = config.root;
      }

      const envResult = getEnv(config, configEnv);
      define = envResult.define;
      envPrefix = envResult.envPrefix;
      env = envResult.env;

      console.log("[RSC] 🔧 setting up build for ", {
        define,
      });
      console.log(
        configEnv.isSsrBuild || configEnv.isPreview
          ? "SERVER SIDE BUILD"
          : "CLIENT SIDE BUILD"
      );
      const root = config.root ?? process.cwd();
      const result = await checkFilesExist(options, root);
      pageSet = result.pageSet;
      pageMap = result.pageMap;
      propsSet = result.propsSet;
      propsMap = result.propsMap;
      entries = Array.from(
        new Set([
          ...Array.from(pageSet.values()),
          ...Array.from(propsSet.values()),
        ]).values()
      );

      const buildConfig = createBuildConfig({
        root: config.root ?? process.cwd(),
        base: config.base ?? envResult.publicUrl,
        outDir: config.build?.outDir ?? "dist/server",
        entries,
      });

      return {
        ...buildConfig,
        define,
      };
    },
    async buildStart() {
      timing.buildStart = performance.now();
      const result = await checkFilesExist(options, config.root);
      pageSet = result.pageSet;
      pageMap = result.pageMap;
      propsSet = result.propsSet;
      propsMap = result.propsMap;
      entries = Array.from(
        new Set([
          ...Array.from(pageSet.values()),
          ...Array.from(propsSet.values()),
        ]).values()
      );
      if (!entries.length) {
        console.warn("[RSC] No entries found");
      }
    },
    async closeBundle() {
      console.log("RSC CLOSE BUNDLE CALLED");
      if (!pageSet?.size) return;
      timing.renderStart = performance.now();

      try {
        const manifest = JSON.parse(
          readFileSync(
            resolvePath(
              config.root,
              config.build.outDir,
              ".vite",
              "manifest.json"
            ),
            "utf-8"
          )
        );

        // Create a single worker for all routes
        if (!worker)
          worker = await createWorker(
            config.root,
            config.build.outDir,
            "worker.js",
            this.environment.mode === "dev" ? "development" : "production"
          );
        // this is based on the user config - the routes should lead to a page and props but the rendering is agnostic of that
        const routes = Array.from(pageMap.keys());
        await renderPages(routes, {
          manifest,
          projectRoot: config.root,
          outDir: config.build.outDir, // Use Vite's configured outDir
          pluginOptions: options,
          worker: worker,
          loader: createPageLoader({
            manifest,
            root: config.root,
            outDir: config.build.outDir,
            moduleBase: options.moduleBase,
            // already registered in the transform
            registerClient: [...clientComponents.keys()],
            alwaysRegisterServer: false,
            registerServer: [],
          }),
        });
        console.log("[RSC] Render complete");
        console.log("[RSC] Terminating worker");
        if (worker) await worker.terminate();

        timing.renderEnd = performance.now();
        timing.total = (timing.renderEnd - timing.start) / 1000;

        // Collect stats
        const stats: BuildStats = {
          htmlFiles: routes.length,
          clientComponents: clientComponents.size,
          cssFiles: cssModules.size,
          totalRoutes: routes.length,
          timing: {
            config: ((timing.configResolved ?? 0) - timing.start) / 1000,
            build:
              ((timing.buildStart ?? 0) - (timing.configResolved ?? 0)) / 1000,
            render:
              ((timing.renderEnd ?? 0) - (timing.renderStart ?? 0)) / 1000,
            total: (timing.renderEnd ?? 0 - timing.start) / 1000,
          },
        };

        // Format duration helper
        const formatDuration = (seconds: number) => {
          if (seconds < 0.001) {
            return `${(seconds * 1000000).toFixed(0)}μs`;
          }
          if (seconds < 1) {
            return `${(seconds * 1000).toFixed(0)}ms`;
          }
          return `${seconds.toFixed(2)}s`;
        };

        console.log("\n[RSC] Build Summary:");
        console.log("─".repeat(50));
        console.log(`📄 Generated ${stats.htmlFiles} HTML files`);
        console.log(`🎯 Processed ${stats.clientComponents} client components`);
        console.log(`🎨 Included ${stats.cssFiles} CSS files`);
        console.log(`🛣️  Total routes: ${stats.totalRoutes}`);
        console.log("─".repeat(50));
        console.log("⏱️  Timing:");
        console.log(`  Config:  ${formatDuration(stats.timing.config)}`);
        console.log(`  Build:   ${formatDuration(stats.timing.build)}`);
        console.log(`  Render:  ${formatDuration(stats.timing.render)}`);
        console.log("  ".repeat(12));
        console.log(`  Total:   ${formatDuration(stats.timing.total)}`);
        console.log("─".repeat(50));
      } catch (error) {
        console.error("[RSC] Build failed:", error);
        throw error;
      }
    },
    async buildEnd(error) {
      if (error) {
        console.error("[RSC] Build error:", error);
      }
      if (worker) await worker.terminate();
    },
    handleHotUpdate({ file }) {
      if (file.endsWith(".css")) {
        cssModules.add(file);
      }
    },
    transform(code: string, id: string) {
      if (
        (id.includes(".client") ||
          code.startsWith('"use client"') ||
          code.startsWith("use client")) &&
        !id.includes("node_modules")
      ) {
        console.log("[RSC] Client component added", id);
        clientComponents.set(id, code);
      }
      return { code };
    },
  };
}

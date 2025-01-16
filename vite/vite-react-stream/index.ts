import { renderToPipeableStream } from "react-server-dom-esm/server.node";
import type { Plugin, ViteDevServer } from "vite";
import { startExport } from "./export-worker.js";
import { DEFAULT_CONFIG, type Options } from "./types.js";

export const viteReactStream = (
  options: Options
): Plugin => {
  let state: {
    activeRequests: Set<{ res: any, stream: ReturnType<typeof renderToPipeableStream> }>,
    isRestarting: boolean,
    moduleRunnerReady: boolean
  };
  return {
    name: "vite:react-stream",
    enforce: 'pre',
    config(config) {
      return {
        build: {
          outDir: config.build?.outDir ?? DEFAULT_CONFIG.OUT_DIR,
          rollupOptions: {
            output: {
              assetFileNames: "assets/[name]-[hash][extname]",
              chunkFileNames: "assets/[name]-[hash].js",
              entryFileNames: "assets/[name]-[hash].js",
            },
          },
        },
      };
    },
    configureServer(server: ViteDevServer) {
      console.log("[stream] Configuring RSC/SSR server");

      state = {
        activeRequests: new Set(),
        isRestarting: false,
        moduleRunnerReady: false
      };

      // Wait for module runner to be ready
      const waitForModuleRunner = async () => {
        try {
          await server.ssrLoadModule('virtual:rsc-state');
          state.moduleRunnerReady = true;
          console.log("[stream] Module runner ready");
        } catch (e) {
          setTimeout(waitForModuleRunner, 100);
        }
      };
      waitForModuleRunner();

      // Add middleware to block requests until ready
      server.middlewares.use((req, res, next) => {
        if (!state.moduleRunnerReady || state.isRestarting) {
          res.writeHead(503, {
            'Retry-After': '1',
            'Content-Type': req.headers.accept === "text/x-component" ?
              'text/x-component' : 'text/plain'
          });
          res.end(req.headers.accept === "text/x-component" ?
            '{"error":"Server starting..."}' : 'Server starting...');
          return;
        }
        next();
      });

      // Handle server close/restart
      server.httpServer?.on('close', () => {
        state.isRestarting = true;
        for (const { stream } of state.activeRequests) {
          if (stream) stream.abort();
        }
        state.activeRequests.clear();
      });

      server.httpServer?.on('listening', () => {
        setTimeout(() => {
          state.isRestarting = false;
        }, 2000);
      });

      // Add RSC request handler
      server.middlewares.use(async (req, res, next) => {
        if (req.headers.accept !== "text/x-component" || state.isRestarting) {
          return next();
        }

        console.log("[stream] Handling RSC request:", req.url);
        const handler = await import('./dev/handler.js').then(m => m.createDevHandler);
        const reqInfo = { res, stream: null as any };
        state.activeRequests.add(reqInfo);
        handler(server, options, server.ssrLoadModule.bind(server))(req, res, next);
      });

      // Return cleanup for actual server close
      return () => {
        if (state.activeRequests.size > 0) {
          console.log(`[stream] Cleaning up ${state.activeRequests.size} requests`);
          for (const { stream } of state.activeRequests) {
            if (stream) stream.abort();
          }
          state.activeRequests.clear();
        }
      };
    },
    resolveId(id) {
      if (id === 'virtual:rsc-state') return '\0virtual:rsc-state';
    },
    load(id) {
      if (id === '\0virtual:rsc-state') {
        return `export const isRestarting = ${state?.isRestarting}`;
      }
    },
    async closeBundle() {
      if (process.env['NODE_ENV'] !== 'production') return;

      const buildConfig = options.build;
      if (!buildConfig?.pages) return;

      try {
      // Build logic here...
        await startExport({
          pages: buildConfig.pages,
          output: buildConfig.output,
          options: options as Options,
        });
      } catch (error) {
        console.error("[vite-react-stream] Export error:", error);
        throw error;
      }
    }
  } as Plugin;
}

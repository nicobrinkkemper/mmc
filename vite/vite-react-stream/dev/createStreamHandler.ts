import { IncomingMessage, ServerResponse } from "http";
import type { ViteDevServer } from "vite";
import { createHandler } from "../createHandler.js";
import type { StreamPluginOptions } from "../types.js";

export function createStreamHandler(server: ViteDevServer, options: StreamPluginOptions) {
  return async (req: IncomingMessage, res: ServerResponse, next: any) => {
    if (!req.url || !req.url.startsWith('/')) return next();
    if (req.headers.accept !== 'text/x-component') return next();

    try {
      const result = await createHandler(options, {
        url: req.url,
        loader: async (id) => {
          // Wrap the loader to check restart state
          if ((server as any)._restartingServer) {
            throw new Error('Server restarting');
          }
          return server.ssrLoadModule(id);
        },
        temporaryReferences: new WeakMap(),
        logger: console,
        moduleGraph: server.moduleGraph
      });

      if (result.type !== 'success') {
        throw new Error(result.type === 'error' ? String(result.error) : 'Skipped');
      }

      res.setHeader('Content-Type', 'text/x-component');
      result.stream.pipe(res);
    } catch (e: any) {
      if (e.message?.includes('Server restarting')) {
        res.end();
        return;
      }
      next(e);
    }
  };
} 
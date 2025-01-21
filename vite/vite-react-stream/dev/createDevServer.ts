import type { ViteDevServer } from "vite";
import type { StreamPluginOptions } from "../types.js";
import { createDevMiddleware } from "./createDevMiddleware.js";

export function createDevServer(
  server: ViteDevServer,
  options: StreamPluginOptions
) {
  server.middlewares.use(createDevMiddleware(server, options));
}

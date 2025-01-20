import type { ViteDevServer } from 'vite';
import type { StreamPluginOptions } from '../types.js';
import { createDevHandler } from './handler.js';

export function createDevServer(server: ViteDevServer, options: StreamPluginOptions) {
  server.middlewares.use(createDevHandler(server, options));
} 

import type { Plugin } from "vite";
import { normalizePath } from "vite";
import { createRscTransformer } from "./transformer.js";

export interface RscPluginOptions {
  projectRoot: string;
  moduleBase: string;
  moduleId?: (path: string) => string;
  include?: string | RegExp | (string | RegExp)[];
  exclude?: string | RegExp | (string | RegExp)[];
}

export function rscTransformPlugin(options: RscPluginOptions): Plugin {
  const fileExtensionRE = /\.m?[jt]sx?$/;
  const include = options.include || fileExtensionRE;
  const exclude = options.exclude;
  let transform: any;
  let config: any;
  let isRscRequest = false;

  return {
    name: "vite:rsc-transform",
    enforce: "pre",

    config(config) {
      // Only add react-server condition for RSC/SSR requests
      if (isRscRequest || config.build?.ssr) {
        return {
          resolve: {
            conditions: ["react-server"],
          },
        };
      }
      return null;
    },

    configResolved(_config) {
      config = _config;

      const transformer = createRscTransformer({
        moduleId: options.moduleId || moduleIdDefault(options),
      });

      transform = transformer.transform;
    },

    async resolveId(id, importer, options) {
      // For client requests, bypass react-server condition
      if (id.includes("react-dom/client") && !options?.ssr) {
        return null; // Let Vite's default resolution work
      }

      // For server context
      if (id.includes(".client")) {
        return {
          id: id.replace(".client", ""),
          moduleSideEffects: true,
        };
      }
      if (id.includes(".server")) {
        return {
          id: id.replace(".server", ""),
          moduleSideEffects: true,
        };
      }

      return null;
    },

    transform(code: string, id: string, opts) {
      if (!matchPattern(id, include)) return null;
      if (exclude && matchPattern(id, exclude)) return null;

      const directiveMatch = code.match(/(?:^|\n|;)"use (client|server)";?/);
      if (!directiveMatch) return null;

      const [banner, directive] = directiveMatch;

      /**
       * Transform scenarios:
       *
       * Development (Vite Dev Server):
       * 1. RSC Stream (isRscRequest true):
       *    - Handled through index.html + ssr.tsx entry
       *    - Creates module map for client/server references
       *    - Enables fast refresh and HMR
       *
       * 2. Client Component Load:
       *    - Vite serves components with client reference metadata
       *    - Enables client-side navigation
       *
       * Production/Export:
       * 3. Server Components:
       *    - RSC process: Transforms for streaming
       *    - SSR process: Transforms for static generation
       *    - Strips RSC functionality in final output
       *    - Results in optimized static files
       */

      // For RSC streaming, we need both client and server transforms
      if (isRscRequest) {
        return transform?.(code, id, { ...opts, ssr: true });
      }

      // For client component requests, we need the client reference metadata
      if (directive === "client" && !opts?.ssr) {
        return transform?.(code, id, opts);
      }

      // For server components in SSR
      if (opts?.ssr) {
        return transform?.(code, id, opts);
      }

      return null;
    },

    handleHotUpdate({ file, modules }) {
      if (
        matchPattern(file, include) &&
        !matchPattern(file, exclude || /^$/) &&
        file.startsWith(options.projectRoot)
      ) {
        return modules;
      }
    },

    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        isRscRequest = req.headers.accept === "text/x-component";
        if (isRscRequest) {
          res.setHeader("Link", '</>; rel="rsc"');
        }
        next();
      });
    },
  };
}

const moduleIdDefault = (options: RscPluginOptions) => (moduleId) => {
  const normalized = normalizePath(moduleId);
  const relative = normalized.slice(options.projectRoot.length);
  return relative;
};

const matchPattern = (
  file: string,
  pattern: string | RegExp | (string | RegExp)[]
) =>
  Array.isArray(pattern)
    ? pattern.some((p) => file.match(p as RegExp))
    : file.match(pattern as RegExp);

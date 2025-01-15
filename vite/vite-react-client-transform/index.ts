import type { Plugin } from "vite";
import { normalizePath } from "vite";
import { createRscTransformer } from "./transformer.js";
import type { ViteReactClientTransformOptions } from "./types.js";

/**
 * Plugin for transforming React Client Components.
 * 
 * Core responsibilities:
 * 1. Detects "use client" directives
 * 2. Transforms client components for RSC boundaries
 * 3. Adds client reference metadata for RSC
 * 
 * When a component is marked with "use client", it:
 * - Gets transformed into a client reference
 * - Maintains module ID for RSC boundaries
 * - Preserves class/function behavior
 * 
 * @example
 * ```ts
 * export default defineConfig({
 *   plugins: [
 *     viteReactClientTransformPlugin({
 *       projectRoot: process.cwd(),
 *     })
 *   ]
 * });
 * ```
 */
export function viteReactClientTransformPlugin(options: ViteReactClientTransformOptions): Plugin {
  const fileExtensionRE = /\.m?[jt]sx?$/;
  const include = options.include || fileExtensionRE;
  const exclude = options.exclude;
  let transform: any;

  return {
    name: "vite:react-client-transform",
    enforce: "pre",

    configResolved(_config) {
      transform = createRscTransformer({
        moduleId: options.moduleId || moduleIdDefault(options),
      }).transform;
    },

    transform(code: string, id: string, opts) {
      // Skip if file doesn't match patterns
      if (!matchPattern(id, include) || (exclude && matchPattern(id, exclude))) {
        return null;
      }

      // Look for use client directive at start of file (after any comments)
      const directiveMatch = code.match(/^(?:\s|\/\*.*?\*\/|\/\/[^\n]*\n)*['"]use client['"];?/);
      if (!directiveMatch) return null;

      // Transform client components
      return transform(code, id, opts);
    }
  };
}

const moduleIdDefault = ({ projectRoot }: ViteReactClientTransformOptions) => (moduleId: string) => {
  const normalized = normalizePath(moduleId);
  return normalized.startsWith(projectRoot) ? normalized.slice(projectRoot.length) : normalized;
};

const matchPattern = (
  file: string,
  pattern: string | RegExp | (string | RegExp)[]
) =>
  Array.isArray(pattern)
    ? pattern.some((p) => file.match(p as RegExp))
    : file.match(pattern as RegExp);

import { build as esbuild } from "esbuild";
import { readFileSync, writeFileSync } from "fs";
import { mkdirSync } from "node:fs";
import path from "path";
import { createElement, Fragment } from "react";
import { renderToPipeableStream } from "react-server-dom-esm/server.node";
import type { Plugin, ViteDevServer } from "vite";
import { startExport } from "./export-worker.js";
import { getModuleGraph } from "./module-graph.js";
import type { BaseProps, Options } from "./types.js";

export const viteReactStream = <T extends BaseProps>(
  options: Options<T>
): Plugin =>
  ({
    name: "vite:react-stream",
    config(config) {
      return {
        build: {
          outDir: "build",
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

      const loader =
        options.moduleLoader?.(server) ?? server.ssrLoadModule.bind(server);
      const { getModuleWithDeps } = getModuleGraph(server);

      // Only handle RSC requests
      server.middlewares.use(async (req, res, next) => {
        if (req.headers.accept === "text/x-component") {
          console.log("[stream] Handling RSC request:", req.url);
          try {
            // Get route from URL
            const route = req.url || "/";
            console.log("[stream] Route:", route);

            // Get both module paths
            const pagePath =
              typeof options.Page === "function"
                ? options.Page(route)
                : options.Page;
            const propsPath =
              typeof options.props === "function"
                ? options.props(route)
                : options.props;

            console.log("[stream] Loading modules:", { pagePath, propsPath });

            // Load modules and collect CSS
            const [pageModule, propsModule] = await Promise.all([
              getModuleWithDeps(pagePath),
              getModuleWithDeps(propsPath),
            ]);

            // Create stream with CSS links first
            const stream = renderToPipeableStream(
              createElement(Fragment, null, [
                // CSS from both modules
                ...[...new Set([...pageModule.css, ...propsModule.css])].map(
                  (href) =>
                    createElement("link", {
                      key: href,
                      rel: "stylesheet",
                      href: href.replace(process.cwd(), ""),
                    })
                ),
                // Then the component
                createElement(
                  await loader(pagePath).then(
                    (m) => m[options.pageExportName ?? "Page"]
                  ),
                  {
                    key: "page",
                    ...(await loader(propsPath).then((m) =>
                      m[options.propsExportName ?? "props"](route)
                    )),
                  }
                ),
              ]),
              options.moduleBase ?? "/src",
              new AbortController() as any
            );

            stream.pipe(res);
          } catch (error) {
            console.error("[stream] Error:", error);
            next(error);
          }
        } else {
          next();
        }
      });
    },
    async buildStart() {
      try {
        mkdirSync("dist", { recursive: true });

        // Build worker with esbuild
        await esbuild({
          entryPoints: ["vite/vite-react-stream/rsc-worker.ts"],
          outfile: "dist/rsc-worker.js",
          format: "esm",
          platform: "node",
          target: "node18",
          bundle: true,
          plugins: [{
            name: 'rsc-worker',
            setup(build) {
              // Handle stream imports
              build.onResolve({ filter: /^stream$/ }, () => ({
                path: 'stream',
                namespace: 'node-builtin'
              }));
            }
          }],
          external: [
            // Node built-ins
            "stream",
            "fs",
            "path",
            "worker_threads",
            // Dependencies
            "react",
            "react-server-dom-esm",
            "react-server-dom-esm/server.node",
          ],
          sourcemap: true,
          jsx: "transform",
          jsxFactory: "React.createElement",
          jsxFragment: "React.Fragment",
          define: {
            "process.env.NODE_ENV": JSON.stringify(process.env["NODE_ENV"]),
          },
        });
      } catch (error) {
        console.error("[vite-react-stream] Build error:", error);
        throw error;
      }
    },
    async buildEnd() {
      const buildConfig = options.build;
      if (!buildConfig?.pages) return;
      try {
        // Build both pages and nesting
        await esbuild({
          entryPoints: [buildConfig.pages],
          outdir: "dist/server",
          format: "esm",
          platform: "node",
          target: "node18",
          bundle: true,
          external: [
            "react",
            "react-server-dom-esm",
            "react-server-dom-esm/server.node",
            "*.webp",
            "*.svg",
          ],
          loader: {
            ".css": "copy",
          },
          plugins: [
            {
              name: "css-collector",
              setup(build) {
                const cssFiles = new Set<string>();

                // Track CSS imports during build
                build.onResolve({ filter: /\.css$/ }, (args) => {
                  const resolvedPath = path.resolve(args.resolveDir, args.path);
                  cssFiles.add(resolvedPath);
                  // Generate a .js file path instead
                  return {
                    path: resolvedPath + ".js",
                    namespace: "css-proxy",
                  };
                });

                // Generate proxy module
                build.onLoad(
                  { filter: /\.css\.js$/, namespace: "css-proxy" },
                  (args) => {
                    return {
                      contents: `
                    const proxy = new Proxy({}, {
                      get: (_, key) => key.toString()
                    });
                    export default proxy;
                  `,
                      loader: "js",
                    };
                  }
                );

                build.onEnd(() => {
                  // Copy CSS files to output preserving directory structure
                  for (const absPath of cssFiles) {
                    const relPath = path.relative(
                      path.join(process.cwd(), "src"),
                      absPath
                    );
                    const outPath = path.join("dist/server", relPath);
                    mkdirSync(path.dirname(outPath), { recursive: true });
                    writeFileSync(outPath, readFileSync(absPath));
                  }
                });
              },
            },
          ],
          define: {
            "process.env.VITE_BASE_URL": JSON.stringify(
              process.env["VITE_BASE_URL"] || ""
            ),
            "process.env.NODE_ENV": JSON.stringify(process.env["NODE_ENV"]),
            "import.meta.env": JSON.stringify({
              VITE_BASE_URL: process.env["VITE_BASE_URL"] || "",
              VITE_PUBLIC_URL: process.env["VITE_PUBLIC_URL"] || "/",
              MODE: process.env["NODE_ENV"] || "production",
              DEV: false,
              SSR: true,
            }),
          },
        });

        // // Import pages
        // const { pages } = (await import(
        //   `${process.cwd()}/dist/server/${path.basename(
        //     buildConfig.pages,
        //     ".tsx"
        //   )}.js`
        // )) as {
        //   pages: Record<
        //     string,
        //     { Page: any; props: { route: string } & Record<string, any> }
        //   >;
        // };

        // Start export with pages
        await startExport({
          pages: buildConfig.pages,
          output: buildConfig.output,
          options: options as Options<T>,
        });
      } catch (error) {
        console.error("[vite-react-stream] Export error:", error);
        throw error;
      }
    },
  } as Plugin);

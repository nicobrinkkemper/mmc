import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { parentPort } from "node:worker_threads";
import { createElement, Fragment } from "react";
import { renderToPipeableStream } from "react-server-dom-esm/server.node";
import type { ViteDevServer } from "vite";
import { getModuleGraph } from "./module-graph";
import type { BaseProps, BuildConfig, Options } from "./types";

const cssModuleProxy = new Proxy(
  {},
  {
    get: (_, key) => key.toString(),
  }
);

/** Generate RSC data for a route */
async function getRscData<T extends BaseProps>(
  route: string,
  options: Options<T>,
  server: ViteDevServer
) {
  console.log("\n[CSS Worker] Starting RSC generation for route:", route);

  // Get module paths
  const pagePath =
    typeof options.Page === "function" ? options.Page(route) : options.Page;
  const propsPath =
    typeof options.props === "function" ? options.props(route) : options.props;

  // Import modules and collect CSS from Vite's module graph
  const { getModuleWithDeps } = getModuleGraph(server);

  // Load modules and collect CSS dependencies
  const [pageModule, propsModule] = await Promise.all([
    getModuleWithDeps(pagePath),
    getModuleWithDeps(propsPath),
  ]);

  // Use collected CSS from module graph
  const cssFiles = new Set([...pageModule.css, ...propsModule.css]);

  // Get exports using configured names
  const [Page, props] = await Promise.all([
    Promise.resolve(pageModule[options.pageExportName ?? "Page"]),
    propsModule[options.propsExportName ?? "props"](route),
  ]);

  const chunks: Buffer[] = [];

  // Add CSS links to stream in order of import
  const stream = renderToPipeableStream(
    createElement(Fragment, null, [
      ...[...cssFiles].map((href) =>
        createElement("link", { rel: "stylesheet", href })
      ),
      createElement(Page, props),
    ]),
    "/src",
    new AbortController()
  );

  // Collect stream chunks
  stream.pipe({
    write: (chunk: Buffer) => chunks.push(chunk),
    end: () => {
      const RSC_DIR = join(process.cwd(), "dist/rsc");
      const outputPath = join(
        RSC_DIR,
        `${route === "/" ? "index" : route}.json`
      );

      mkdirSync(dirname(outputPath), { recursive: true });
      writeFileSync(outputPath, Buffer.concat(chunks));
    },
  });

  // Remove unused cssImports and cssManifest references
  console.log(
    "\n[CSS Worker] Found CSS files:",
    [...cssFiles].map((path) => `\n  - ${path}`).join("")
  );
  console.log("\n[CSS Worker] Stream created with CSS links");
  console.log("\n[CSS Worker] Finished RSC generation for route:", route, "\n");

  return stream;
}

/** Generate static HTML */
async function generateHtml<T extends BaseProps>(
  route: string,
  options: Options<T>,
  server: ViteDevServer
) {
  return getRscData(route, options, server);
}

parentPort?.on(
  "message",
  async <T extends BaseProps>(config: BuildConfig<T>) => {
    try {
      for (const route of config.routes ?? []) {
        await getRscData(route.path, config.options!, config.server!);
        await generateHtml(route.path, config.options!, config.server!);
      }
      parentPort?.postMessage("done");
    } catch (error) {
      console.error(error);
    }
  }
);

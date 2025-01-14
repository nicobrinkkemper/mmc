import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { parentPort } from "node:worker_threads";
import { createElement, Fragment } from "react";
import { renderToPipeableStream } from "react-server-dom-esm/server.node";
import { Writable } from "stream";
import type { ViteDevServer } from "vite";
import { getModuleGraph } from "./module-graph.js";
import type { BaseProps, BuildConfig, Options } from "./types.js";

function collectStream(stream: ReturnType<typeof renderToPipeableStream>): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    const writable = new Writable({
      write(chunk, _encoding, callback) {
        chunks.push(Buffer.from(chunk));
        callback();
      },
      final(callback) {
        resolve(Buffer.concat(chunks));
        callback();
      }
    });

    stream.pipe(writable);
  });
}

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
  const pageExportName = (options.pageExportName ?? "Page") as keyof typeof pageModule;
  const propsExportName = (options.propsExportName ?? "props") as keyof typeof propsModule;

  // Import modules and collect CSS from Vite's module graph
  const { getModuleWithDeps } = getModuleGraph(server);

  // Load modules and collect CSS dependencies
  const [pageModule, propsModule] = await Promise.all([
    getModuleWithDeps(pagePath),
    getModuleWithDeps(propsPath),
  ]);

  // Use collected CSS from module graph
  const cssFiles = new Set([...pageModule.css, ...propsModule.css]);
  const pageModuleExport = pageModule[pageExportName];
  const propsModuleExport = propsModule[propsExportName];
  // Get exports using configured names
  const [Page, props] = await Promise.all([
    typeof pageModuleExport === 'string' ? server.ssrLoadModule(pageModuleExport).then(mod => mod[pageExportName]) : Promise.resolve(pageModuleExport),
    typeof propsModuleExport === 'string' ? server.ssrLoadModule(propsModuleExport).then(mod => mod[propsExportName](route)) : Promise.resolve(propsModuleExport),
  ]);
  console.log(Page, props);
  // Add CSS links to stream in order of import
  const stream = renderToPipeableStream(
    createElement(Fragment, null, [
      ...[...cssFiles].map((href) =>
        createElement("link", { rel: "stylesheet", href })
      ),
      createElement(Page, props),
    ]),
    "/src",
    new AbortController() as any
  );
  // Remove unused cssImports and cssManifest references
  console.log(
    "\n[CSS Worker] Found CSS files:",
    [...cssFiles].map((path) => `\n  - ${path}`).join("")
  );

  const data = await collectStream(stream);
  // Write RSC data to file
  const RSC_DIR = join(process.cwd(), "dist/rsc");
  const outputPath = join(
    RSC_DIR,
    `${route === "/" ? "index" : route.replace(/^\//, "")}.json`
  );
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, JSON.stringify(data));

  server.close();
  return data;
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
        const data = await getRscData(route.path, config.options!, config.server!);
        // Do something with data if needed
      }
      parentPort?.postMessage("done");
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
);

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { parentPort } from "node:worker_threads";
import { createElement, Fragment } from "react";
import { renderToPipeableStream } from "react-server-dom-esm/server.node";
import { DEFAULT_CONFIG, type BaseProps, type BuildConfig } from "./types.js";

async function getRscData<T extends BaseProps>(
  route: string,
  options: BuildConfig<T>["options"]
) {
  console.log("\n[RSC] Generating RSC data for route:", route);

  // Read CSS manifest
  const cssManifest = JSON.parse(
    readFileSync(`${DEFAULT_CONFIG.OUT_DIR}/${DEFAULT_CONFIG.SERVER_DIR}/css-manifest.json`, "utf-8")
  ) as string[];

  // Create chunks array to collect stream data
  const chunks: Buffer[] = [];

  // Create stream with CSS links
  const stream = renderToPipeableStream(
    createElement(Fragment, null, [
      // Add CSS links first
      ...cssManifest.map((href) =>
        createElement("link", {
          rel: "stylesheet",
          href: `${DEFAULT_CONFIG.MODULE_BASE}/${href}`,
        })
      ),
      // Then the page content
      createElement(options?.Html || DEFAULT_CONFIG.HTML, { manifest: {} }),
    ]),
    options?.moduleBase ?? DEFAULT_CONFIG.MODULE_BASE,
    new AbortController() as any
  );

  // Collect stream data
  await new Promise<void>((resolve) => {
    stream.pipe({
      write: (chunk: Buffer) => chunks.push(chunk),
      end: () => resolve(),
    } as any);
  });

  console.log(
    "\n[RSC] CSS files for route:",
    cssManifest.map((path) => `\n  - ${path}`).join("")
  );

  return Buffer.concat(chunks);
}

export async function exportRsc<T extends BaseProps>(config: BuildConfig<T>) {
  const BASE_DIR = resolve(process.cwd(), config.output?.dir ?? DEFAULT_CONFIG.OUT_DIR);
  const RSC_DIR = resolve(BASE_DIR, config.output?.rsc ?? DEFAULT_CONFIG.RSC_DIR);

  // Ensure RSC directory exists
  mkdirSync(RSC_DIR, { recursive: true });

  // Import pages and get routes
  const pagesPath = typeof config.pages === 'function'
    ? await config.pages()
    : config.pages;

  const { pages } = await import(pagesPath[0]) as {
    pages: Record<string, { route: { path: string } }>;
  };

  for (const { route } of Object.values(pages)) {
    try {
      // Normalize path for filesystem
      const normalizedPath = route.path.replace(/^\/+/, "").replace(/\/+$/, "");
      const outputPath = resolve(
        RSC_DIR,
        normalizedPath ? `${normalizedPath}.json` : "index.json"
      );

      // Ensure directory exists
      mkdirSync(dirname(outputPath), { recursive: true });

      // Generate RSC data
      const rsc = await getRscData<T>(route.path, config.options);
      writeFileSync(outputPath, JSON.stringify(rsc));

      console.log(`[RSC] Generated ${route.path} -> ${outputPath}`);
    } catch (error) {
      console.error(`[RSC] Failed to generate ${route.path}:`, error);
    }
  }

  console.log("🚀 RSC build ready!");
  parentPort?.postMessage("done");
}

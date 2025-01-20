import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { createElement, Fragment } from "react";
import { renderToPipeableStream as renderToHtmlStream } from "react-dom/server.node";
import { renderToPipeableStream } from "react-server-dom-esm/server.node";
import { DEFAULT_CONFIG, type BuildConfig } from "./types.js";

async function getRscData(
  route: string,
  options: BuildConfig["options"]
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

async function generateStaticOutput(
  route: string,
  rscData: Buffer,
  options: BuildConfig["options"],
  outputDir: string
) {
  // Create HTML stream with RSC data embedded
  const htmlStream = renderToHtmlStream(
    createElement(options?.Html || DEFAULT_CONFIG.HTML, {
      manifest: {},
      children: createElement(Fragment, null, [
        // Embed RSC data
        createElement('script', {
          type: 'text/x-component',
          dangerouslySetInnerHTML: {
            __html: rscData.toString('utf-8')
          }
        }),
        // Add client entry
        createElement('script', {
          type: 'module',
          src: `${options?.moduleBase || DEFAULT_CONFIG.MODULE_BASE}/entry-client.js`
        })
      ])
    })
  );

  // Collect HTML stream
  const chunks: Buffer[] = [];
  await new Promise<void>((resolve) => {
    htmlStream.pipe({
      write: (chunk: Buffer) => chunks.push(chunk),
      end: () => resolve(),
    } as any);
  });

  // Write HTML file
  const htmlPath = resolve(
    outputDir,
    route === '/' ? 'index.html' : `${route.replace(/^\//, '')}/index.html`
  );
  mkdirSync(dirname(htmlPath), { recursive: true });
  writeFileSync(htmlPath, Buffer.concat(chunks));

  console.log(`[Static] Generated ${htmlPath}`);
}

export async function exportRsc(config: BuildConfig) {
  const BASE_DIR = resolve(process.cwd(), config.output?.dir ?? DEFAULT_CONFIG.OUT_DIR);
  const RSC_DIR = resolve(BASE_DIR, config.output?.rsc ?? DEFAULT_CONFIG.RSC_DIR);
  const STATIC_DIR = resolve(BASE_DIR, config.output?.static ?? 'static');

  // Ensure directories exist
  mkdirSync(RSC_DIR, { recursive: true });
  mkdirSync(STATIC_DIR, { recursive: true });

  // Get routes
  const routes = typeof config.pages === 'function' 
    ? await config.pages()
    : config.pages;

  for (const route of routes) {
    try {
      // Generate RSC data
      const rsc = await getRscData(route, config.options);
      
      // Write RSC data
      const rscPath = resolve(
        RSC_DIR,
        route === '/' ? 'index.json' : `${route.replace(/^\//, '')}.json`
      );
      mkdirSync(dirname(rscPath), { recursive: true });
      writeFileSync(rscPath, rsc);

      // Generate static HTML
      await generateStaticOutput(route, rsc, config.options, STATIC_DIR);

    } catch (error) {
      console.error(`[Export] Failed to generate ${route}:`, error);
    }
  }

  console.log("🚀 Static site generation complete!");
}

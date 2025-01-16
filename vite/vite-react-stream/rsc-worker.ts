import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { Writable } from "node:stream";
import { parentPort } from "node:worker_threads";
import { createElement, Fragment } from "react";
import { renderToPipeableStream } from "react-server-dom-esm/server.node";
import { DEFAULT_CONFIG, type BuildConfig, type Options } from "./types.js";

async function collectStream(stream: ReturnType<typeof renderToPipeableStream>): Promise<Buffer> {
  return new Promise((resolve) => {
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

async function generateRscPayload<T>(
  route: string,
  options: Options,
  outputDir: string
) {
  console.log(`\n[RSC] Generating payload for route: ${route}`);

  try {
    // Get module paths - they should already be resolved
    const pagePath = typeof options.Page === "function"
      ? options.Page(route)
      : options.Page;
    const propsPath = typeof options.props === "function"
      ? options.props(route)
      : options.props;

    // Ensure we're using .js extension
    const pagePathJs = pagePath.replace(/\.tsx?$/, '.js');
    const propsPathJs = propsPath.replace(/\.tsx?$/, '.js');

    console.log(`[RSC] Loading modules:
      Page: ${pagePathJs}
      Props: ${propsPathJs}
    `);

    // Dynamic imports for page and props
    const [{ [options.pageExportName ?? DEFAULT_CONFIG.PAGE_EXPORT]: Page }, { [options.propsExportName ?? DEFAULT_CONFIG.PROPS_EXPORT]: props }] = await Promise.all([
      import(pagePathJs),
      import(propsPathJs)
    ]);

    // Create RSC stream
    const stream = renderToPipeableStream(
      createElement(Fragment, null, [
        createElement(Page, props)
      ]),
      options.moduleBase ?? DEFAULT_CONFIG.MODULE_BASE,
      new AbortController() as any
    );

    // Collect stream data
    const data = await collectStream(stream);

    // Write RSC payload
    const outputPath = join(
      outputDir,
      route === '/' ? 'index.rsc' : `${route.replace(/^\//, '')}.rsc`
    );

    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, data);

    console.log(`[RSC] Generated ${outputPath}`);
    return data;

  } catch (error) {
    console.error(`[RSC] Failed to generate payload for ${route}:`, error);
    throw error;
  }
}

// Handle worker messages
parentPort?.on('message', async (config: BuildConfig<any>) => {
  try {
    const outputDir = resolve(
      process.cwd(),
      config.output?.dir ?? DEFAULT_CONFIG.OUT_DIR,
      config.output?.rsc ?? DEFAULT_CONFIG.RSC_DIR
    );

    // Handle both sync and async pages
    const pagesPath = typeof config.pages === 'function'
      ? await config.pages()
      : config.pages;

    const routes = await Promise.resolve(pagesPath);

    for (const route of routes) {
      await generateRscPayload(route, {
        ...config.options,
        moduleBase: config.options?.moduleBase ?? DEFAULT_CONFIG.MODULE_BASE,
        Page: config.options?.Page || DEFAULT_CONFIG.PAGE_EXPORT,
        props: config.options?.props || DEFAULT_CONFIG.PROPS_EXPORT,
        Html: config.options?.Html || DEFAULT_CONFIG.HTML
      }, outputDir);
    }

    parentPort?.postMessage('done');
    process.exit(0);
  } catch (error) {
    console.error('[RSC] Export failed:', error);
    process.exit(1);
  }
});

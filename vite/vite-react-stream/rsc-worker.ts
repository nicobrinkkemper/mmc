import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { Writable } from "node:stream";
import { parentPort } from "node:worker_threads";
import { createElement, Fragment } from "react";
import { renderToPipeableStream } from "react-server-dom-esm/server.node";
import type { BuildConfig, Options } from "./types.js";

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
    // Get module paths
    const pagePath = typeof options.Page === "function"
      ? options.Page(route)
      : options.Page;
    const propsPath = typeof options.props === "function"
      ? options.props(route)
      : options.props;

    // Dynamic imports for page and props
    const [{ [options.pageExportName ?? 'Page']: Page }, propsModule] = await Promise.all([
      import(resolve(process.cwd(), pagePath)),
      import(resolve(process.cwd(), propsPath))
    ]);

    // Get props
    const props = typeof propsModule[options.propsExportName ?? 'props'] === 'function'
      ? await propsModule[options.propsExportName ?? 'props'](route)
      : propsModule[options.propsExportName ?? 'props'];

    // Create RSC stream
    const stream = renderToPipeableStream(
      createElement(Fragment, null, [
        createElement(Page, props)
      ]),
      options.moduleBase ?? '/src',
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
      config.output?.dir ?? 'dist',
      config.output?.rsc ?? 'rsc'
    );

    // Import routes configuration
    const { [config.options?.propsExportName ?? 'props']: props } = await import(resolve(process.cwd(), config.pages)) as {
      [key: string]: Record<string, { route: { path: string } }>;
    };

    // Instead of passing functions, pass the resolved paths directly
    const routes = Object.values(props).map(page => ({
      path: page.route.path,
      pagePath: join(process.cwd(), 'dist/server',
        typeof config.options?.Page === "function"
          ? config.options.Page(page.route.path)
          : config.options?.Page ?? 'Page'),
      propsPath: join(process.cwd(), 'dist/server',
        typeof config.options?.props === "function"
          ? config.options.props(page.route.path)
          : config.options?.props ?? 'props')
    }));

    for (const route of routes) {
      await generateRscPayload(route.path, {
        ...config.options,
        // Use resolved paths instead of functions
        Page: route.pagePath,
        props: route.propsPath
      }, outputDir);
    }

    parentPort?.postMessage('done');
    process.exit(0);
  } catch (error) {
    console.error('[RSC] Export failed:', error);
    process.exit(1);
  }
});

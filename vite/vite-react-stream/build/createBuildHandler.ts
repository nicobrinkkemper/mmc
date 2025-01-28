import { PassThrough } from "node:stream";
import { resolve } from "path";
import type { PipeableStream } from "react-server-dom-esm/server.node";
import type { NormalizedInputOptions, PluginContext } from "rollup";
import { createHandler } from "../rsc/createHandler.js";
import { createRscTransformer } from "../transformer/transformer.js";
import { tryManifest } from "../tryManifest.js";
import type {
  BuildConfig,
  RscBuildResult,
  StreamPluginOptions,
} from "../types.js";

async function streamToString(stream: PipeableStream): Promise<string> {
  const passThrough = new PassThrough();
  stream.pipe(passThrough);

  const chunks = [];
  for await (const chunk of passThrough) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString("utf-8");
}

export async function createBuildHandler(
  pluginContext: PluginContext,
  normalizedRollupConfig: NormalizedInputOptions,
  options: StreamPluginOptions,
  buildConfig: BuildConfig & {
    cssModules?: Set<string>;
  }
): Promise<RscBuildResult> {
  const pages = await Promise.resolve(buildConfig.pages());
  console.log(`[RSC] Building ${pages.length} pages...`);

  const manifest = tryManifest({
    root: pluginContext.environment.config.root,
    outDir: "dist/server",
    ssrManifest: false,
  });

  if (!manifest) {
    throw new Error(
      "[RSC] Could not find server manifest. Make sure the server build has completed."
    );
  }

  const loader = (id: string) => {
    const moduleBase = options.moduleBase ?? "src";
    const match = id.match(new RegExp(`${moduleBase}/(.+)$`));
    if (!match) {
      throw new Error(
        `[RSC] Invalid module path ${id} - must contain ${moduleBase}/`
      );
    }

    const lookupPath = `${moduleBase}/${match[1]}`;
    const file = manifest[lookupPath]?.file;
    if (!file) {
      // Try without dist/server prefix
      const altPath = id.replace(/^.*?\/src\//, "src/");
      const altFile = manifest[altPath]?.file;
      if (!altFile) {
        throw new Error(
          `[RSC] Could not find built file for ${id} in manifest (tried ${lookupPath}, ${altPath})`
        );
      }
      return import(
        resolve(pluginContext.environment.config.root, "dist/server", altFile)
      );
    }

    return import(
      resolve(pluginContext.environment.config.root, "dist/server", file)
    );
  };

  // Add the RSC transformer plugin
  if (!normalizedRollupConfig.plugins) {
    normalizedRollupConfig.plugins = [];
  }

  const transformer = createRscTransformer({
    moduleId: (path: string) => {
      console.log("path", path);
      return path;
    },
  });

  normalizedRollupConfig.plugins.push({
    ...transformer,
    transform(code: string, id: string) {
      return transformer.transform(code, id, { inMap: null, ssr: true });
    },
  });

  const streams = [];

  for (const route of pages) {
    try {
      const result = await createHandler(route, options, {
        cssFiles: Array.from(buildConfig.cssModules ?? []),
        loader: loader,
      });

      if (result.type !== "success") {
        console.warn(`[RSC] Skipping ${route} - ${result.type}`, result.error);
        continue;
      }

      // Convert stream to string
      const rscContent = await streamToString(result.stream);
      streams.push(rscContent);
      console.log(`[RSC] ✓ Generated ${route}`);
    } catch (error) {
      console.error(`[RSC] Failed to build ${route}:`, error);
    }
  }

  return streams;
}

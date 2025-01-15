import { createElement } from "react";
import { renderToPipeableStream } from "react-server-dom-esm/server.node";
import type { ViteDevServer } from "vite";
import type { BaseProps, RscStreamParams, StreamResult } from "../types.js";

/**
 * Collects all assets from the module graph
 */
function collectAssets(moduleId: string, server?: ViteDevServer) {
  if (!server) return { css: [], imports: [], assets: [] };
  const cssFiles = new Set<string>();
  const assetFiles = new Set<string>();
  const importsFiles = new Set<string>();

  // Convert moduleId to URL format that Vite uses internally
  const moduleUrl = "/" + moduleId;
  const pageModule = server.moduleGraph.urlToModuleMap.get(moduleUrl);

  if (!pageModule) {
    return { css: [], imports: [], assets: [] };
  }

  // Traverse the module graph to collect CSS
  const seen = new Set<string>();
  function traverse(mod: any) {
    if (!mod?.id || seen.has(mod.id)) return;
    seen.add(mod.id);
    if (mod.url?.match(/\.m?[jt]sx?$/)) {
      importsFiles.add(mod.url);
      return;
    }
    if (mod.url?.endsWith(".css")) {
      cssFiles.add(mod.url);
      const cssContent = mod.transformResult?.code || "";
      const imageUrls =
        cssContent.match(/url\((?:['"]?)([^'"]*?)(?:['"]?)\)/g) || [];
      imageUrls.forEach((match: string) => {
        const urlMatch = match.match(/url\((?:['"]?)([^'"]*?)(?:['"]?)\)/)?.[1];
        if (
          urlMatch &&
          !urlMatch.startsWith("data:") &&
          !urlMatch.startsWith("http")
        ) {
          assetFiles.add(urlMatch);
        }
      });
    }
    // Traverse imported modules
    mod.importedModules?.forEach((m: any) => traverse(m));
  }

  traverse(pageModule);

  return {
    css: Array.from(cssFiles),
    imports: Array.from(importsFiles),
    assets: Array.from(assetFiles),
  };
}

/**
 * Creates the manifest for the page
 */
function createManifest(
  pagePath: string,
  collectedAssets: ReturnType<typeof collectAssets>
) {
  return {
    [pagePath]: {
      file: pagePath,
      css: collectedAssets.css,
      imports: collectedAssets.imports,
      assets: collectedAssets.assets,
      isEntry: true,
    },
  };
}

/**
 * Handles RSC streaming in development
 */
export async function handleRscStream<T extends BaseProps>(
  params: RscStreamParams<T>
): Promise<StreamResult> {
  const {
    url,
    controller,
    server,
    loader,
    Layout,
    options,
    pageExportName,
    propsExportName,
  } = params;

  try {
    const pagePath =
      typeof options.Page === "function" ? options.Page(url) : options.Page;
    const propsPath =
      typeof options.props === "function" ? options.props(url) : options.props;

    // Load modules directly through the SSR loader
    const [Page, props] = await Promise.all([
      loader(pagePath).then(({ [pageExportName]: Page }: any) => typeof Page === "function" ? Page : () => Page),
      loader(propsPath).then(({ [propsExportName]: props }: any) => typeof props === "function" ? props(url) : props),
    ]);

    // Collect all assets
    const collectedAssets = collectAssets(pagePath, server);
    const manifest = createManifest(pagePath, collectedAssets);

    // Create stream with collected assets
    const stream = renderToPipeableStream(
      createElement(Layout, { manifest, ...props }, createElement(Page, props)),
      options.moduleBase ?? "",
      controller as any
    );

    return { type: "success", stream };
  } catch (error) {
    console.error("[RSC] Stream error:", error);
    return { type: "error", error };
  }
}

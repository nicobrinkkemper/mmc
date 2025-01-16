import { createElement } from "react";
import { renderToPipeableStream } from "react-server-dom-esm/server.node";
import type { ViteDevServer } from "vite";
import { normalizePath } from "vite";
import type { BaseProps, RscStreamParams, StreamResult } from "../types.js";
import { DEFAULT_CONFIG } from "../types.js";
/**
 * Collects all assets from the module graph
 */
function collectAssets(moduleId: string, server?: ViteDevServer) {
  if (!server) return { css: [], imports: [], assets: [] };
  const cssFiles = new Set<string>();
  const assetFiles = new Set<string>();
  const importsFiles = new Set<string>();

  // Try both with and without leading slash
  const moduleUrl = normalizePath(moduleId);
  const pageModule = server.moduleGraph.urlToModuleMap.get(moduleUrl) ||
    server.moduleGraph.urlToModuleMap.get('/' + moduleUrl);

  if (!pageModule) {
    console.log("[RSC] No module found for:", moduleUrl);
    return { css: [], imports: [], assets: [] };
  }

  // Traverse the module graph to collect CSS
  const seen = new Set<string>();
  function traverse(mod: any) {
    if (!mod?.id || seen.has(mod.id)) return;
    seen.add(mod.id);

    // Track JS/TS modules
    if (mod.url?.match(/\.m?[jt]sx?$/)) {
      importsFiles.add(mod.url);
    }

    // Track CSS and assets
    if (mod.url?.endsWith(".css")) {
      cssFiles.add(mod.url);
      // Extract image URLs from CSS
      const cssContent = mod.transformResult?.code || "";
      const imageUrls = cssContent.match(/url\((?:['"]?)([^'"]*?)(?:['"]?)\)/g) || [];
      imageUrls.forEach((match: string) => {
        const urlMatch = match.match(/url\((?:['"]?)([^'"]*?)(?:['"]?)\)/)?.[1];
        if (urlMatch && !urlMatch.startsWith("data:") && !urlMatch.startsWith("http")) {
          assetFiles.add(urlMatch);
        }
      });
    }

    // Traverse imported modules
    mod.importedModules?.forEach((m: any) => traverse(m));
  }

  traverse(pageModule);
  console.log("[RSC] Collected assets for", moduleUrl, ":", {
    css: Array.from(cssFiles),
    imports: Array.from(importsFiles),
    assets: Array.from(assetFiles)
  });

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
    Html: Layout,
    options,
    pageExportName,
    propsExportName,
  } = params;

  try {
    // Check if module runner is valid
    if (!server?.moduleGraph?.urlToModuleMap) {
      console.log("[RSC] Server not ready");
      return {
        type: "error",
        error: new Error("Server restarting...")
      };
    }

    // Check if module runner is closed
    if ((server as any).moduleRunner?.isClosed?.()) {
      console.log("[RSC] Module runner closed");
      return {
        type: "error",
        error: new Error("Server restarting...")
      };
    }

    const pagePath =
      typeof options.Page === "function" ? options.Page(url) : options.Page;
    const propsPath =
      typeof options.props === "function" ? options.props(url) : options.props;

    // Load modules directly through the SSR loader
    const [Page, props] = await Promise.all([
      loader(normalizePath(pagePath)).then(({ [pageExportName]: Page }: any) => typeof Page === "function" ? Page : () => Page),
      loader(normalizePath(propsPath)).then(({ [propsExportName]: props }: any) => typeof props === "function" ? props(url) : props),
    ]);

    // Collect all assets
    const collectedAssets = collectAssets(normalizePath(pagePath), server);
    const manifest = createManifest(pagePath, collectedAssets);

    // Create stream with collected assets
    const stream = renderToPipeableStream(
      createElement(Layout, { manifest, ...props }, createElement(Page, props)),
      options.moduleBase ?? DEFAULT_CONFIG.MODULE_BASE,
      { signal: controller.signal, onError: (error) => console.error("[RSC] Stream error:", error) }
    );

    return { type: "success", stream };
  } catch (error) {
    console.error("[RSC] Stream error:", error);
    return { type: "error", error };
  }
}

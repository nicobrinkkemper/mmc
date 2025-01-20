import { createElement } from "react";
import { renderToPipeableStream } from "react-server-dom-esm/server.node";
import type { ModuleLoader, RscStreamOptions, StreamResult } from '../types.js';

async function resolveProps(loader: ModuleLoader, path: string, exportName: string, url: string) {
  const propsModule = await loader(path);  
  const hasProps = exportName in propsModule
  const isPropsFn = hasProps && typeof propsModule[exportName] === 'function'
  const isPropsObject = hasProps && typeof propsModule[exportName] === 'object' && isPropsFn != null && !Array.isArray(propsModule[exportName])
  if (isPropsFn) {
    try {
      return {type: "success", props: await Promise.resolve(propsModule[exportName](url))}
    } catch (error) {
      return {type: "error", error: new Error(`Could not resolve props export "${exportName}" in "${path}".`) }
    }
  }
  if(isPropsObject) {
    return {type: "success", props: propsModule[exportName]}
  }
  return { type: "error", error: new Error(`Could not find props export "${exportName}" in "${path}". Available exports are ${Object.keys(propsModule ?? {}).join(", ")}`) };
}

async function resolvePage(loader: ModuleLoader, path: string, exportName: string) {
  const pageModule = await loader(path);  
  if(exportName in pageModule && typeof pageModule[exportName] === 'function') {
    return {type: "success", page: pageModule[exportName]};
  }
  return { type: "error", error: new Error(`Could not find Page export "${exportName}" in "${path}". Available exports are ${Object.keys(pageModule ?? {}).join(", ")}`) };
}

export async function handleRscStream(params: RscStreamOptions): Promise<StreamResult> {
  const { url, controller, loader, Html, moduleBase, pagePath, propsPath, temporaryReferences, logger } = params;
  try {
    // Get props
    const props = await resolveProps(loader, propsPath ?? pagePath, params.propsExportName, url);
    if(props.type === "error") return { type: props.type, error: props.error };
    // Get page
    const Page = await resolvePage(loader, pagePath, params.pageExportName);
    if(Page.type === "error") return { type: Page.type, error: Page.error };

    // Create RSC stream
    const stream = renderToPipeableStream(
      createElement(Html, null,
        createElement(Page.page, props.props)
      ),
      moduleBase,
      {
        signal: controller.signal,
        onError: logger.error,
        environmentName: "development",
        temporaryReferences: temporaryReferences
      }
    );

    return { type: "success", stream };
  } catch (error) {
    return { type: "error", error };
  }
}

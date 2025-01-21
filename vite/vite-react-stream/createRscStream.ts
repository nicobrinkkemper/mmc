import { createElement, Fragment } from "react";
import { renderToPipeableStream } from "react-server-dom-esm/server.node";
import { CssCollector } from "./components.js";
import type { ModuleLoader, RscStreamOptions, StreamResult } from "./types.js";

async function resolveProps(
  loader: ModuleLoader,
  path: string,
  exportName: string,
  url: string
): Promise<
  | { type: "success"; props: any }
  | { type: "error"; error: Error }
  | { type: "skip" }
> {
  const propsModule = await loader(path);
  const hasProps = exportName in propsModule;
  const isPropsFn = hasProps && typeof propsModule[exportName] === "function";
  const isPropsObject = hasProps && typeof propsModule[exportName] === "object";

  if (isPropsFn) {
    try {
      const propsResult = await Promise.resolve(propsModule[exportName](url));
      if (!propsResult) return { type: "skip" };
      return { type: "success", props: propsResult };
    } catch (error) {
      return {
        type: "error",
        error: error as Error,
      };
    }
  }
  if (isPropsObject) {
    return { type: "success", props: propsModule[exportName] };
  }
  return {
    type: "error",
    error: new Error(
      `Could not find props export "${exportName}" in "${path}".`
    ),
  };
}

async function resolvePage(
  loader: ModuleLoader,
  path: string,
  exportName: string
): Promise<{ type: "success"; page: any } | { type: "error"; error: Error }> {
  const pageModule = await loader(path);
  if (
    exportName in pageModule &&
    typeof pageModule[exportName] === "function"
  ) {
    return { type: "success", page: pageModule[exportName] };
  }
  return {
    type: "error",
    error: new Error(
      `Could not find Page export "${exportName}" in "${path}".`
    ),
  };
}

export async function createRscStream(
  streamOptions: RscStreamOptions
): Promise<StreamResult> {
  const {
    url,
    controller,
    loader,
    Html,
    moduleBase,
    pagePath,
    propsPath,
    temporaryReferences,
    logger,
    moduleGraph,
  } = streamOptions;
  try {
    const cssModules = new Set<string>();

    const safeLoader = async (id: string) => {
      try {
        const mod = await loader(id);

        const pageModule = moduleGraph.getModuleById(pagePath);

        if (pageModule) {
          const scanned = new Set<string>();
          const scanDeps = (moduleNode: any) => {
            if (!moduleNode || scanned.has(moduleNode.id)) return;
            scanned.add(moduleNode.id);

            for (const dep of moduleNode.importedModules) {
              if (dep.id?.endsWith(".css")) {
                cssModules.add(dep.url);
              }
              scanDeps(dep);
            }
          };

          scanDeps(pageModule);
        }

        return mod;
      } catch (e: any) {
        if (e.message?.includes("module runner has been closed")) {
          throw new Error("SERVER_RESTARTING");
        }
        throw e;
      }
    };

    const props = await resolveProps(
      safeLoader,
      propsPath ?? pagePath,
      streamOptions.propsExportName,
      url
    );
    if (props.type === "error") return { type: props.type, error: props.error };
    if (props.type === "skip") return { type: props.type };
    const Page = await resolvePage(
      safeLoader,
      pagePath,
      streamOptions.pageExportName
    );
    if (Page.type === "error") return { type: Page.type, error: Page.error };

    const stream = renderToPipeableStream(
      createElement(Fragment, null, [
        createElement(
          Html,
          { key: "html" },
          createElement(Page.page, { key: "page", ...props.props })
        ),
        ...Array.from(cssModules).map((css, index) =>
          createElement(CssCollector, {
            key: `css-${index}`,
            url: css,
          })
        ),
      ]),
      moduleBase,
      {
        signal: controller.signal,
        onError: logger.error,
        environmentName: "development",
        temporaryReferences: temporaryReferences,
      }
    );

    return { type: "success", stream };
  } catch (error) {
    return { type: "error", error };
  }
}

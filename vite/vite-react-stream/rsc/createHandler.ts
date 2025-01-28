import { createLogger, type Logger } from "vite";
import { DEFAULT_CONFIG } from "../options.js";
import { resolvePage } from "../resolvePage.js";
import { resolveProps } from "../resolveProps.js";
import type { StreamPluginOptions } from "../types.js";
import { createRscStream } from "./createRscStream.js";

type CreateHandlerOptions<T> = {
  temporaryReferences?: WeakMap<any, any>;
  logger?: Logger;
  cssFiles?: string[];
  loader: (id: string, opt?: T) => Promise<any>;
};

export async function createHandler<T>(
  url: string,
  pluginOptions: Pick<
    StreamPluginOptions,
    | "Page"
    | "props"
    | "build"
    | "Html"
    | "pageExportName"
    | "propsExportName"
    | "moduleBase"
    | "moduleBasePath"
  >,
  streamOptions: CreateHandlerOptions<T>
) {
  const Html = pluginOptions.Html ?? DEFAULT_CONFIG.HTML;
  const pageExportName =
    pluginOptions.pageExportName ?? DEFAULT_CONFIG.PAGE_EXPORT;
  const propsExportName =
    pluginOptions.propsExportName ?? DEFAULT_CONFIG.PROPS_EXPORT;
  const moduleBase = pluginOptions.moduleBase ?? DEFAULT_CONFIG.MODULE_BASE;
  const controller = new AbortController();

  const cssFiles = streamOptions.cssFiles;
  const propsPath =
    typeof pluginOptions.props === "function"
      ? pluginOptions.props(url)
      : pluginOptions.props;
  const pagePath =
    typeof pluginOptions.Page === "function"
      ? pluginOptions.Page(url)
      : pluginOptions.Page;

  const cssModules = new Set<string>(...(cssFiles ?? []));

  const moduleBasePath =
    typeof pluginOptions.moduleBasePath === "string"
      ? pluginOptions.moduleBasePath
      : moduleBase.startsWith("/")
      ? moduleBase
      : `/${moduleBase}`;

  const loadWithCss = async (id: string) => {
    try {
      const mod = await streamOptions.loader(id);
      // collect css files
      if (id.includes(".css")) {
        console.log("CSS MODULE ADDED", id);
        cssModules.add(id);
      }

      return mod;
    } catch (e: any) {
      if (e.message?.includes("module runner has been closed")) {
        return { [id]: { type: "skip" } };
      } else {
        return { [id]: { type: "error", error: e } };
      }
    }
  };

  const PropsModule = await resolveProps({
    propsModule: await loadWithCss(propsPath ?? pagePath),
    path: String(propsPath ?? pagePath),
    exportName: propsExportName,
    url,
  });
  if (PropsModule.type === "error")
    return { type: PropsModule.type, error: PropsModule?.error };
  if (PropsModule.type === "skip") return { type: PropsModule.type };
  const props = PropsModule[propsExportName as keyof typeof PropsModule] as any;
  if (props?.type === "error") return { type: props.type, error: props.error };
  if (props?.type === "skip") return { type: props.type };

  const PageModule = await resolvePage({
    pageModule: await loadWithCss(pagePath),
    path: pagePath,
    exportName: pageExportName,
    url,
  });
  if (PageModule.type === "error")
    return { type: PageModule.type, error: PageModule.error };
  if (PageModule.type === "skip") return { type: PageModule.type };
  const Page = PageModule[pageExportName as keyof typeof PageModule] as any;
  if (Page?.type === "error") return { type: Page.type, error: Page.error };
  if (Page?.type === "skip") return { type: Page.type };
  if (!(typeof Page === "function")) {
    return {
      type: "error",
      error: new Error("Invalid Page component: " + pagePath, {
        cause: Page,
      }),
    };
  }
  if (!(typeof props === "object")) {
    return {
      type: "error",
      error: new Error("Invalid props: " + propsPath, {
        cause: props,
      }),
    };
  }
  const stream = createRscStream({
    controller,
    Html: Html,
    Page: Page,
    props: props,
    temporaryReferences: streamOptions.temporaryReferences,
    moduleBasePath, // eg /src
    logger: streamOptions.logger ?? createLogger(),
    cssFiles: Array.from(cssModules),
    route: url,
    url,
  });

  if (!stream) {
    return { type: "skip" as const };
  }

  return {
    type: "success" as const,
    controller,
    stream,
    assets: {
      css: cssFiles,
    },
  };
}

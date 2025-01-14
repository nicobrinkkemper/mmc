import Head from "lodash-es/head.js";
import React from "react";
import { usePage, useProps } from "./server-hooks.js";

export function RenderPage({ pathInfo }: { pathInfo: ThemePathInfo }) {
  const Page = usePage({ pathInfo });
  return <Page />;
}

export function RenderHead({
  pathInfo,
  criticalCss,
}: {
  pathInfo: ThemePathInfo<ValidRoute>;
  criticalCss: string;
}) {
  const staticData = useProps({ pathInfo });
  return (
    <>
      {criticalCss !== "" ? <style type="text/css">{criticalCss}</style> : null}
      <Head {...(staticData as any)} />
    </>
  );
}

export function RenderComponent({
  requestPath,
  pathInfo,
}: {
  requestPath: string;
  pathInfo: ThemePathInfo;
}) {
  // Keep the full path but remove /src/ prefix and .js extension
  const componentId = requestPath.replace(/^\/src\//, "").replace(/\.js$/, "");

  console.log("Loading component:", componentId);

  // Import using the full path
  const Component = React.use(import(`../${componentId}`));
  return getExportedReactComponent(Component);
}

const isUpperCased = (key: string) => key[0].toUpperCase() === key[0];
function getExportedReactComponent(module: any) {
  if (typeof module === "function") {
    console.warn("Already a function", module);
    return module;
  }
  const isObj = typeof module === "object" && module != null;
  const keys = isObj ? Object.keys(module) : [];
  const hasDefaultExport = keys.length === 1 && keys[0] === "default";
  if (hasDefaultExport) {
    if (typeof module.default === "function") {
      return module.default;
    }
  }
  if (keys.length) {
    // find the first function with a capital letter
    for (const key of keys) {
      if (isUpperCased(key) && typeof module[key] === "function") {
        return module[key];
      }
    }
  }
  return () => module;
}

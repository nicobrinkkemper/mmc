import React from "react";
import type {
  CssComponentType,
  CssContent,
  RootProps,
} from "vite-plugin-react-server/types";

// Inlined copy of vite-plugin-react-server/components' Css, to avoid the hosted
// component's require-cycle in the no-flag `--app` build. Emits a <style> for
// inline CSS or a <link> for an external stylesheet.
export const Css: CssComponentType = ({ cssFiles }) => {
  if (!cssFiles) return null;
  const cssFilesArray = Array.isArray(cssFiles)
    ? cssFiles
    : Array.from(cssFiles.values());
  if (!cssFilesArray.length) return null;
  const arr = cssFilesArray.map((cssFile: CssContent) => {
    const {
      as: As = React.Fragment,
      id,
      children,
      precedence,
      type,
      ...rest
    } = cssFile;
    if (
      As !== "link" &&
      (typeof children === "string" || React.isValidElement(children))
    ) {
      return (
        <As {...rest} type={type ?? "text/css"} key={id}>
          {children ?? null}
        </As>
      );
    }
    return <As {...rest} key={id} precedence={precedence} />;
  });
  if (!arr.length) return null;
  return arr;
};

// Theme-agnostic Root. Each route now carries only its own theme's CSS (imported
// by that route's `route.tsx` layout), so there is nothing to filter — render
// the page and its collected CSS as-is. No theme knowledge lives here anymore.
export const Root = ({
  as: Component,
  cssFiles = new Map<string, never>(),
  pageProps = {},
  Page,
  ...props
}: RootProps) => {
  return (
    <Component {...props}>
      <Page {...pageProps} />
      <Css cssFiles={cssFiles} />
    </Component>
  );
};

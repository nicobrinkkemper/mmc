import React from "react";
import type { CssComponentType, CssContent } from "vite-plugin-react-server/types";

// Inlined copy of vite-plugin-react-server/components' Css. The hosted component
// cannot be imported into MmcHtml (the document wrapper): in the no-flag
// `vite build --app` build it collapses the whole document to a fragment
// (vprs 3.1.0 now surfaces that as a build error rather than shipping it
// silently, but the underlying cause is still open). A local copy sidesteps it.
// Emits a <style> for inline CSS or a <link> for an external stylesheet.
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

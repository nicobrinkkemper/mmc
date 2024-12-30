import * as React from "react";
import { PropsWithChildren } from "react";
import { defaultTitle } from "../config/themeConfig.js";

const criticalCSS = `body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; } * { padding: 0; margin: 0; min-width: 0; box-sizing: border-box; } img { max-width: 100%; object-fit: cover; color: transparent; } strong { font-weight: bold; }`;

export function Head({
  title = defaultTitle,
  children,
}: PropsWithChildren<Pick<HtmlProps, "title">>) {
  return (
    <>
      <meta html-charset="utf-8" />
      <title>{title}</title>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/css/flag-icon.min.css"
      />
      <style>{criticalCSS}</style>
      {children}
    </>
  );
}

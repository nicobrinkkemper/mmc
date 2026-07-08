import React from "react";
import type { RootProps } from "vite-plugin-react-server/types";
import { mainTheme, themes } from "./config/themeConfig.js";

const removeableCSS = [
  "/src/css/4ymm.module.css",
  "/src/css/5-6ymm.module.css",
  "/src/css/7mmc.module.css",
  "/src/css/8mmc.module.css",
  "/src/css/9mmc.module.css",
];

import type { CssComponentType, CssContent } from "vite-plugin-react-server/types";

// Copied from vite-plugin-react-server/components/css.tsx to test a theory (build with react-server global condition)
export const Css: CssComponentType = ({ cssFiles }) => {
  if (!cssFiles) return null;
  const cssFilesArray = Array.isArray(cssFiles)
    ? cssFiles
    : Array.from(cssFiles.values());
  if (!cssFilesArray.length) return null;
  const arr = cssFilesArray.map((cssFile: CssContent) => {
    // Emit style tag for inline CSS
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
      // style tag
      // since we can't bubble up the style tags, we need to be creative
      return (
        <As {...rest} type={type ?? "text/css"} key={id}>
          {children ?? null}
        </As>
      );
    }
    // link tag
    return <As {...rest} key={id} precedence={precedence} />;
  });
  if (!arr.length) return null;
  return arr;
};


const createFilter = (theme: Theme) => {
  if (theme === "5ymm" || theme === "6ymm") {
    return [theme, removeableCSS.filter((css) => css.includes("5-6ymm"))];
  }
  return [theme, removeableCSS.filter((css) => css.includes(theme))];
};

const filters = Object.fromEntries(themes.map(createFilter)) as {
  [key in Theme]: string[];
};

export const Root = ({
  as: Component,
  cssFiles = new Map<string, never>(),
  pageProps = { pathInfo: { theme: mainTheme } },
  Page,
  ...props
}: RootProps<{
  pathInfo: { theme: Theme };
}>) => {
  const theme = pageProps?.pathInfo?.theme ?? mainTheme;
  const cssArray = Array.from(cssFiles.values());
  const removeNonCurrentThemeCss = new Map(
    cssArray
      .filter(
        (file) =>
          !removeableCSS.includes(file.id) || filters[theme].includes(file.id)
      )
      .map((file) => [file.id, file])
  );
  return (
    <Component {...props}>
      <Page {...pageProps} />
      <Css cssFiles={removeNonCurrentThemeCss} />
    </Component>
  );
};

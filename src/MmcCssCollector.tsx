import React, { type Fragment } from "react";
import { CssCollectorElements } from "vite-plugin-react-server/components";
import type { CssCollectorProps } from "vite-plugin-react-server/types";
import { themes } from "./config/themeConfig.js";

const removeableCSS = [
  "/src/css/4ymm.module.css",
  "/src/css/5-6ymm.module.css",
  "/src/css/7mmc.module.css",
  "/src/css/8mmc.module.css",
  "/src/css/9mmc.module.css",
];

const createFilter = (theme: Theme) => {
  if (theme === "5ymm" || theme === "6ymm") {
    return [theme, removeableCSS.filter((css) => css.includes("5-6ymm"))];
  }
  return [theme, removeableCSS.filter((css) => css.includes(theme))];
};

const filters = Object.fromEntries(themes.map(createFilter)) as unknown as {
  [key in Theme]: string[];
};

export type CssCollectorType = ThemeComponent<
  {},
  "div",
  CssCollectorProps<
    {
      pathInfo: { theme: Theme };
    },
    boolean,
    "div" | typeof Fragment
  >
>;

export const MmcCssCollector = ({
  as: Component,
  children,
  cssFiles,
  pageProps,
  Page,
  ...props
}: CssCollectorProps<
  {
    pathInfo: { theme: Theme };
  },
  boolean,
  "div" | typeof Fragment
>) => {
  if (!cssFiles) return null;
  if (!pageProps || !("pathInfo" in pageProps)) return null;
  const theme = pageProps.pathInfo.theme;
  const cssArray = Array.isArray(cssFiles)
    ? cssFiles
    : Array.from(cssFiles?.values() ?? []);

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
      <CssCollectorElements cssFiles={removeNonCurrentThemeCss} />
    </Component>
  );
};

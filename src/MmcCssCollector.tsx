import React from "react";
import { CssCollectorElements } from "vite-plugin-react-server/components";
import type { CssContent } from "vite-plugin-react-server/types";
import { themes } from "./config/themeConfig.js";
import type { PageProps } from "./Html.js";

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
  {
    pageProps: PageProps;
    cssFiles: Map<string, CssContent>;
    children: React.ReactNode;
  }
>;

export const MmcCssCollector: CssCollectorType = ({
  as: Component = React.Fragment,
  children,
  cssFiles,
  pageProps,
  ...props
}) => {
  if (!cssFiles) return children;

  const cssArray = Array.isArray(cssFiles)
    ? cssFiles
    : Array.from(cssFiles?.values() ?? []);

  const removeNonCurrentThemeCss = new Map(
    cssArray
      .filter(
        (file) =>
          !removeableCSS.includes(file.id) ||
          filters[pageProps.pathInfo.theme].includes(file.id)
      )
      .map((file) => [file.id, file])
  );

  return (
    <Component {...props}>
      {children}
      <CssCollectorElements cssFiles={removeNonCurrentThemeCss} />
    </Component>
  );
};

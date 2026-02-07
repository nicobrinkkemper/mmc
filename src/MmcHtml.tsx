import React from "react";
import { Css } from "vite-plugin-react-server/components";
import type { HtmlProps } from "vite-plugin-react-server/types";
import { Favicons } from "./layout/Favicons.js";
import { Head } from "./layout/Head.js";

export type MmcHtmlType = ThemeComponent<
  {},
  typeof React.Fragment,
  HtmlProps<PageProps, boolean, "div">
>;

export const Html: MmcHtmlType = ({
  pageProps,
  globalCss,
  cssFiles,
  Root,
  Page,
  as: Component = "div" as "div",
}) => {
  if (!pageProps) {
    throw new Error("pageProps is required");
  }
  return (
    <html>
      <head>
        <Head
          title={pageProps.title}
          description={pageProps.description}
          url={pageProps.url}
          contentType={pageProps.contentType}
          published={pageProps.published}
          updated={pageProps.updated}
          category={pageProps.category}
          tags={pageProps.tags}
          twitter={pageProps.twitter}
          image={pageProps.image}
        />
        <meta name="description" content={pageProps.description} />
        <Favicons favicons={pageProps.favicons} />
        <Css cssFiles={globalCss} />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css"
        />
      </head>
      <body>
        <Root
          id="root"
          Page={Page}
          cssFiles={cssFiles}
          pageProps={pageProps}
          as={Component}
        />
      </body>
    </html>
  );
};

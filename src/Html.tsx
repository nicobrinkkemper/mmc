import React from "react";
import { CssCollectorElements } from "vite-plugin-react-server/components";
import type { HtmlProps } from "vite-plugin-react-server/types";
import { Favicons } from "./layout/Favicons.js";
import { Head } from "./layout/Head.js";

export type PageProps = ThemeStaticDataReturn<
  ValidRoute,
  {
    title: true;
    description: true;
    url: true;
    contentType: true;
    published: true;
    updated: true;
    category: true;
    tags: true;
    twitter: true;
    image: true;
    favicons: true;
    pathInfo: ["theme"];
  }
>;

export type MmcHtmlType = ThemeComponent<
  {},
  typeof React.Fragment,
  HtmlProps<PageProps, boolean>
>;

export const Html: MmcHtmlType = ({
  children,
  pageProps,
  globalCss,
  cssFiles,
  CssCollector,
  Page,
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
        <CssCollectorElements cssFiles={globalCss} />
      </head>
      <body>
        <div id="root">
          <Page {...pageProps} />
          <CssCollectorElements cssFiles={cssFiles} />
        </div>
      </body>
    </html>
  );
};

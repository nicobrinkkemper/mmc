import React, { type PropsWithChildren } from "react";
import { CssCollectorElements } from "vite-plugin-react-server/components";
import type { HtmlProps } from "vite-plugin-react-server/types";
import { Favicons } from "./layout/Favicons.js";
import { Head } from "./layout/Head.js";
export const Html = ({
  children,
  pageProps,
  globalCss,
  cssFiles,
}: PropsWithChildren<HtmlProps>) => {
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
          {children}
          <CssCollectorElements cssFiles={cssFiles} />
        </div>
      </body>
    </html>
  );
};

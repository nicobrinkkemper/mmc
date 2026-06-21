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
        {/* Must be the first head element: declares the document encoding so the
            browser decodes the prerendered UTF-8 HTML correctly even when the
            host doesn't send a charset header. Without it, non-ASCII text (™, —)
            decodes as Latin-1 and mismatches the client render (React #418). */}
        <meta charSet="utf-8" />
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

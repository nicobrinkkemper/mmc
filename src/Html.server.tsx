import React from "react";
import type { Manifest } from "vite";
import { Favicons } from "./layout/Favicons.js";
import { Head } from "./layout/Head.js";

export const Html = ({
  children,
  pageProps,
  manifest,
}: {
  children: React.ReactNode;
  pageProps: HtmlProps;
  manifest: Manifest;
}) => {
  if (process.env["NODE_ENV"] === "production") {
    return (
      <html>
        <head>
          <Head title={pageProps.title} />
          <meta name="description" content={pageProps.description} />
          <Favicons favicons={pageProps.favicons} />
        </head>
        <body>
          <div id="root">{children}</div>
          <script type="module" src="/src/client.js"></script>
        </body>
      </html>
    );
  }
  return <>{children}</>;
};

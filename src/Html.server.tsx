import React, { PropsWithChildren } from "react";
import { Favicons } from "./layout/Favicons.js";
import { Head } from "./layout/Head.js";

export const Html = ({
  children,
  pageProps,
}: PropsWithChildren<{ pageProps: any }>) => {
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
        </body>
      </html>
    );
  }
  return <>{children}</>;
};

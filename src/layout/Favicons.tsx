import * as React from "react";
import { absoluteUrl } from "../config/env";

export function Favicons({
  favicons,
}: Pick<HtmlProps, "favicons">) {
  if (!favicons) return null;
  return (
    <>
      {favicons.favicon ? (
        <link
          rel="icon"
          href={absoluteUrl(favicons.favicon)}
        />
      ) : null}
      {favicons.favicon_512x512 ? (
        <link
          rel="icon"
          sizes="512x512"
          href={absoluteUrl(favicons.favicon_512x512)}
        />
      ) : null}
      {favicons.favicon_192x192 ? (
        <link
          rel="icon"
          sizes="192x192"
          href={absoluteUrl(favicons.favicon_192x192)}
        />
      ) : null}
      {favicons.favicon_64x64 ? (
        <link
          rel="icon"
          sizes="64x64"
          href={absoluteUrl(favicons.favicon_64x64)}
        />
      ) : null}
    </>
  );
}

import type { ComponentProps } from "react";
import * as React from "react";
import { absoluteURL } from "../config/env.server";

export type FaviconsType = ThemeComponent<{
  favicons: true;
}>;
export type FaviconProps<T> = T & ComponentProps<FaviconsType>;

export const Favicons: FaviconsType = ({ favicons }) => {
  if (!favicons) return null;
  return (
    <>
      {favicons.favicon ? (
        <link rel="icon" href={absoluteURL(favicons.favicon)} />
      ) : null}
      {favicons.favicon_512x512 ? (
        <link
          rel="icon"
          sizes="512x512"
          href={absoluteURL(favicons.favicon_512x512)}
        />
      ) : null}
      {favicons.favicon_192x192 ? (
        <link
          rel="icon"
          sizes="192x192"
          href={absoluteURL(favicons.favicon_192x192)}
        />
      ) : null}
      {favicons.favicon_64x64 ? (
        <link
          rel="icon"
          sizes="64x64"
          href={absoluteURL(favicons.favicon_64x64)}
        />
      ) : null}
    </>
  );
};

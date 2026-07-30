import type { ComponentProps } from "react";
export type FaviconsType = ThemeComponent<{
  favicons: true;
}>;
export type FaviconProps<T> = T & ComponentProps<FaviconsType>;

// `favicons.*` are already fully resolved URLs — getStaticData runs each through
// absoluteURL. Render them as-is. Re-applying absoluteURL here double-prefixes
// the deploy base on the client, where the decoded flight value is a base-
// absolute path: "/mmc/8mmc/favicon.ico" -> "/mmc/mmc/8mmc/favicon.ico" (404).
export const Favicons: FaviconsType = ({ favicons }) => {
  if (!favicons) return null;
  return (
    <>
      {favicons.favicon ? (
        <link rel="icon" href={favicons.favicon} />
      ) : null}
      {favicons.favicon_512x512 ? (
        <link rel="icon" sizes="512x512" href={favicons.favicon_512x512} />
      ) : null}
      {favicons.favicon_192x192 ? (
        <link rel="icon" sizes="192x192" href={favicons.favicon_192x192} />
      ) : null}
      {favicons.favicon_64x64 ? (
        <link rel="icon" sizes="64x64" href={favicons.favicon_64x64} />
      ) : null}
    </>
  );
};

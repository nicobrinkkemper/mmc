"use client";

import * as React from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { getThemePathInfo } from "./data/getThemePathInfo.js";
import { useEventListener } from "./hooks/useEventListener.js";
import { Favicons } from "./layout/Favicons.js";
import { RenderRoute } from "./router/RenderRoute.js";
type ClientType = ThemeComponent<{
  pathInfo: true;
}>;

const ClientLayout = ({
  children,
  favicons,
  title,
  pathInfo,
}: React.PropsWithChildren<{
  pathInfo: ThemePathInfo;
  favicons: {
    [key in
      | "favicon"
      | "favicon_512x512"
      | "favicon_192x192"
      | "favicon_64x64"]: string;
  };
  title: string;
}>) => {
  console.log("Client", { pathInfo });
  const nodes = React.useRef<NodeListOf<Element> | null>(
    document.querySelectorAll("link[rel='icon']")
  );
  useEffect(() => {
    // remove title and favicons from the HEAD so we can portal them in
    if (title && title !== document.title) document.title = title;
    if (Object.keys(favicons).length > 0) {
      nodes.current?.forEach((favicon) => {
        if (favicon instanceof HTMLLinkElement && favicons) {
          const size = favicon.sizes.value;
          const matchingFavicon = !size
            ? favicons["favicon"]
            : `favicon_${size}` in favicons
            ? favicons[`favicon_${size}` as keyof typeof favicons]
            : null;
          if (matchingFavicon) {
            favicon.href = matchingFavicon;
          }
        }
      });
    }
  }, [favicons, title]);
  return (
    <React.Fragment key={title}>
      {createPortal(<Favicons favicons={favicons} />, document.head)}
      {children}
    </React.Fragment>
  );
};

export const Client: ClientType = ({ pathInfo: initialPathInfo }) => {
  const [pathInfo = initialPathInfo, setPathInfo] =
    React.useState<ThemePathInfo>();

  useEventListener("popstate", (e) => {
    if (e instanceof PopStateEvent) {
      // if we already have state, we probably don't need to update it
      if (Object.keys(e.state ?? {}).length) {
        setPathInfo(e.state);
      } else {
        setPathInfo(getThemePathInfo(window.location.href));
      }
    }
  });

  const clickHandler: (
    e: React.MouseEvent<HTMLAnchorElement>,
    anchorProps: { href: string; target?: string }
  ) => void = React.useCallback(
    (e, { href, target }) => {
      e.preventDefault();
      if (target?.toLowerCase() === "_blank") {
        window.open(href, "_blank");
        return;
      }
      if (!href) return;
      // Handle relative and hash changes
      const newHref = !href.startsWith("/") ? pathInfo?.to + href : href;
      const newState = getThemePathInfo(newHref);
      window.history.pushState(newState, "", newHref);

      window.dispatchEvent(
        new PopStateEvent("popstate", {
          state: newState,
        })
      );
    },
    [pathInfo]
  );

  const props = React.useMemo(
    () => ({
      clickable: ({
        children,
        href,
        ...props
      }: React.PropsWithChildren<{ href: string }>) => {
        return (
          <a
            {...props}
            href={href ? href : ""}
            onClick={(e) => {
              clickHandler(e, { href: href, ...props });
            }}
          >
            {children}
          </a>
        );
      },
    }),
    [clickHandler]
  );

  return (
    <RenderRoute pathInfo={pathInfo} props={props} layout={ClientLayout} />
  );
};

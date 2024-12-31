"use client";

import * as React from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { PUBLIC_URL } from "./config/constants.js";
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
}: React.PropsWithChildren<Pick<HtmlProps, "favicons" | "title">>) => {
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

const baseUrl =
  PUBLIC_URL !== ""
    ? PUBLIC_URL.startsWith("/")
      ? PUBLIC_URL
      : "/" + PUBLIC_URL
    : "";
export const Client: ClientType = ({ pathInfo: initialPathInfo }) => {
  const [pathInfo = initialPathInfo, setPathInfo] =
    React.useState<ThemePathInfo<ValidPath>>();

  useEventListener("popstate", () => {
    const newPathInfo = getThemePathInfo(window.location.pathname as ValidPath);
    setPathInfo(newPathInfo as any);
  });

  const clickHandler: React.MouseEventHandler<HTMLAnchorElement> =
    React.useCallback((e) => {
      if (e.currentTarget.target !== "_blank") e.preventDefault();
      if (!e.currentTarget.href) return;
      try {
        const newPathInfo = getThemePathInfo(e.currentTarget.href as ValidPath);
        console.log(baseUrl, newPathInfo.to);
        // use the History API to navigate
        window.history.pushState({}, "", `${baseUrl}${newPathInfo.to}`);
        window.dispatchEvent(new PopStateEvent("popstate"));
        setPathInfo(newPathInfo as any);
      } catch (err) {
        console.error(e.currentTarget.href, err);
      }
    }, []);

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
            href={href ? baseUrl + href : ""}
            onClick={clickHandler}
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

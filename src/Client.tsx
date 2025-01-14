"use client";

import * as React from "react";
type ClientType = ThemeComponent<{
  pathInfo: true;
}>;

// type CallbackType = (
//   e: React.MouseEvent<HTMLAnchorElement>,
//   anchorProps: { href: string; target?: string }
// ) => void;

// const resolvePath = (base: string, path: string) => {
//   if (path.startsWith("/")) return path;
//   const parts = base.split("/").filter(Boolean);
//   const pathParts = path.split("/").filter(Boolean);
//   return "/" + [...parts.slice(0, -1), ...pathParts].join("/");
// };

// type Props = {
//   clickable: (
//     props: React.PropsWithChildren<{ href: string }>
//   ) => React.ReactElement;
// };

// type ClickableProps = {
//   clickable?: string;
//   href: string;
//   children?: React.ReactNode;
// };

export const Client: ClientType = ({ pathInfo: initialPathInfo, children }) => {
  const [pathInfo, setPathInfo] =
    React.useState<ThemePathInfo>(initialPathInfo);

  // const clickHandler: CallbackType = React.useCallback(
  //   (e, { href, target }) => {
  //     e.preventDefault();
  //     if (target?.toLowerCase() === "_blank") {
  //       window.open(href, "_blank");
  //       return;
  //     }
  //     if (!href) return;
  //     const newHref = href.startsWith("#")
  //       ? pathInfo?.to + href
  //       : resolvePath(pathInfo?.to ?? "/", href);
  //     const newState = getThemePathInfo(newHref);
  //     window.history.pushState(newState, "", newHref);

  //     window.dispatchEvent(
  //       new PopStateEvent("popstate", {
  //         state: newState,
  //       })
  //     );
  //   },
  //   [pathInfo]
  // );

  // const props = React.useMemo(
  //   () =>
  //     ({
  //       clickable: ({
  //         children,
  //         href,
  //         ...props
  //       }: React.PropsWithChildren<{ href: string }>) => {
  //         return (
  //           <a
  //             {...props}
  //             href={href ? href : ""}
  //             onClick={(e) => {
  //               clickHandler(e, { href: href, ...props });
  //             }}
  //           >
  //             {children}
  //           </a>
  //         );
  //       },
  //     } as Props),
  //   [clickHandler]
  // );

  return (
    <React.Fragment key={pathInfo.to + pathInfo.hash}>
      {children}
    </React.Fragment>
  );
};

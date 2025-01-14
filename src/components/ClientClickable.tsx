"use client";
import React, { useCallback } from "react";
import { getThemePathInfo } from "../data/getThemePathInfo.js";

interface Props {
  children: React.ReactNode;
  className?: string;
  href: string;
}
type PropsWithHref = Omit<Props, "to"> & { href: string; to?: never };

export const ClientClickable: React.FC<Props | PropsWithHref> = ({
  href,
  children,
  className,
}) => {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const pathInfo = getThemePathInfo(e.currentTarget.href);
      window.history.pushState(pathInfo, "", pathInfo.to);
      window.dispatchEvent(new PopStateEvent("popstate", { state: pathInfo }));
    },
    [href]
  );

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

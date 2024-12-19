import * as React from "react";
import { FooterStatic } from "./Footer.js";
import { LogoStatic, LogoStaticProps } from "./Logo.js";

export type LayoutProps = React.PropsWithChildren<{
  className?: string;
  type?: "special" | "simple" | "normal";
}> &
  Omit<LogoStaticProps, "logo">;

export function LayoutStatic({
  children,
  className,
  type = "normal",
  small = false,
  theme,
  images,
  pathInfo,
  nextAndPrevTheme,
  clickable,
}: LayoutProps) {
  return (
    <>
      <LogoStatic
        small={small}
        logo={type === "normal" ? "logo" : `logo_${type}`}
        theme={theme}
        pathInfo={pathInfo}
        images={images}
        nextAndPrevTheme={nextAndPrevTheme}
        clickable={clickable}
      />
      <article className={className}>{children}</article>
      <FooterStatic pathInfo={pathInfo} clickable={clickable} />
    </>
  );
}

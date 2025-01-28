import * as React from "react";
import { Footer } from "./Footer.js";
import { Logo } from "./Logo.js";

type LayoutComponent = ThemeComponent<{
  images: ["logo"];
  pathInfo: ["toHome", "toCredits"];
  adjacent: {
    pathInfo: ["to"];
    images: ["logo"];
  };
  small: true;
  clickable: true;
}>;

export const Layout: LayoutComponent = ({
  children,
  className,
  small,
  images,
  pathInfo,
  adjacent,
  clickable,
}) => {
  return (
    <>
      <Logo
        small={small}
        pathInfo={pathInfo}
        images={images}
        adjacent={adjacent}
        clickable={clickable}
        key="logo"  
      />
      <article className={className} key="article">
        {children}
      </article>
      <Footer pathInfo={pathInfo} key="footer" clickable={clickable} />
    </>
  );
};

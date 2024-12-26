import * as React from "react";
import { CarouselLogoStatic } from "./CarouselLogo.js";
import { FooterStatic } from "./Footer.js";

type LayoutComponent = ThemeComponent<{
  images: pickOptional<["logo", "logo_simple", "logo_special"]>;
  pathInfo: true;
  adjacent: {
    pathInfo: ["to"];
    images: ["logo"];
  };
  type: true;
  small: true;
  clickable: true;
}>;

export const Layout: LayoutComponent = ({
  children,
  className,
  type = "normal",
  small = false,
  images,
  pathInfo,
  adjacent,
  clickable,
}) => {
  return (
    <>
      <CarouselLogoStatic
        small={small}
        type={type}
        pathInfo={pathInfo}
        images={images}
        adjacent={adjacent}
        clickable={clickable}
      />
      <article className={className}>{children}</article>
      <FooterStatic pathInfo={pathInfo} clickable={clickable} />
    </>
  );
};

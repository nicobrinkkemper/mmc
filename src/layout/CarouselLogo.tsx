import classNames from "classnames";
import * as React from "react";
import styles from "./Logo.module.css";
import { ThemeLogoStatic } from "./ThemeLogo.js";

type CarouselLogoType = ThemeComponent<{
  images: pickOptional<["logo", "logo_special", "logo_simple"]>;
  pathInfo: ["toHome"];
  type: true;
  small: true;
  clickable: true;
  adjacent: {
    pathInfo: ["to"];
    images: ["logo"];
  };
}>;

export const CarouselLogoStatic: CarouselLogoType = ({
  small,
  type,
  className,
  images,
  pathInfo,
  adjacent,
  clickable: Clickable,
}) => {
  const size = small ? "small" : "big";

  return (
    <>
      <Clickable
        href={pathInfo.toHome}
        className={classNames(className, styles["Logo"], styles[size])}
      >
        <ThemeLogoStatic images={images} type={type} small={small} />
      </Clickable>

      {adjacent.prev.exists === true ? (
        <Clickable
          className={styles["PrevTheme"]}
          href={adjacent.prev.value.pathInfo.to}
        >
          <ThemeLogoStatic images={adjacent.prev.value.images} small />
        </Clickable>
      ) : null}
      {adjacent.next.exists === true ? (
        <Clickable
          className={styles["NextTheme"]}
          href={adjacent.next.value.pathInfo.to}
        >
          <ThemeLogoStatic images={adjacent.next.value.images} small />
        </Clickable>
      ) : null}
    </>
  );
};

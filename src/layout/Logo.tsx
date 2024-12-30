import classNames from "classnames";
import * as React from "react";
import { PublicImage } from "../components/PublicImage.js";
import styles from "./Logo.module.css";

type LogoType = ThemeComponent<{
  images: ["logo"];
  pathInfo: ["toHome"];
  small: true;
  clickable: true;
  adjacent?: {
    pathInfo: ["to"];
    images: ["logo"];
  };
}>;

export const Logo: LogoType = ({
  small,
  className,
  images: { logo },
  pathInfo,
  adjacent,
  clickable: Clickable,
}) => {
  return (
    <>
      <Clickable
        href={pathInfo.toHome}
        className={classNames(
          className,
          styles["Logo"],
          styles[small ? "small" : "big"]
        )}
      >
        <PublicImage {...logo} />
      </Clickable>

      {adjacent?.prev.exists === true ? (
        <Clickable
          className={classNames(styles["PrevTheme"], styles["small"])}
          href={adjacent.prev.value.pathInfo.to}
        >
          <PublicImage {...adjacent.prev.value.images.logo} />
        </Clickable>
      ) : null}
      {adjacent?.next.exists === true ? (
        <Clickable
          className={classNames(styles["NextTheme"], styles["small"])}
          href={adjacent.next.value.pathInfo.to}
        >
          <PublicImage {...adjacent.next.value.images.logo} />
        </Clickable>
      ) : null}
    </>
  );
};

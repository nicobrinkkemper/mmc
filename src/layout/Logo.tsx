import classNames from "clsx";
import * as React from "react";
import { PublicImage } from "../components/PublicImage.js";
import { baseURL } from "../config/env.server.js";
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
  images,
  pathInfo,
  adjacent,
  clickable: Clickable,
}) => {
  return (
    <>
      <Clickable
        href={baseURL(pathInfo.toHome)}
        className={classNames(
          className,
          styles["Logo"],
          small ? styles["small"] : styles["big"]
        )}
      >
        <PublicImage {...images.logo} />
      </Clickable>

      {adjacent?.prev.exists === true ? (
        <Clickable
          className={classNames(
            styles["PrevTheme"],
            small ? styles["small"] : styles["big"]
          )}
          href={baseURL(adjacent.prev.value.pathInfo.to)}
        >
          <PublicImage {...adjacent.prev.value.images.logo} />
        </Clickable>
      ) : null}
      {adjacent?.next.exists === true ? (
        <Clickable
          className={classNames(
            styles["NextTheme"],
            small ? styles["small"] : styles["big"]
          )}
          href={baseURL(adjacent.next.value.pathInfo.to)}
        >
          <PublicImage {...adjacent.next.value.images.logo} />
        </Clickable>
      ) : null}
    </>
  );
};

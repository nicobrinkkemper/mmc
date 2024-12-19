import classNames from "classnames";
import * as React from "react";
import styles from "./App.module.css";
import { getCss } from "./css/getCss.js";

type AppStaticProps = {
  theme: Theme;
  children: React.ReactNode;
} & React.JSX.IntrinsicElements["div"];

export const AppStatic = ({
  theme,
  children,
  style,
  ...rest
}: AppStaticProps) => {
  const Theme = getCss(theme, "Theme");

  return (
    <div
      className={classNames(styles["App"], Theme)}
      style={style ? style : { overflowY: "scroll" }}
      {...rest}
    >
      {children}
    </div>
  );
};

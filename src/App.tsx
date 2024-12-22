import classNames from "classnames";
import * as React from "react";
import styles from "./App.module.css";
import { getCss } from "./css/getCss.js";

type AppStaticProps = {
  theme: Theme;
  images: ThemeImages;
  children: React.ReactNode;
} & React.JSX.IntrinsicElements["div"];

export const AppStatic = ({
  theme,
  children,
  style,
  images,
  ...rest
}: AppStaticProps) => {
  const Theme = getCss(theme, "Theme");
  const links = Object.entries(images as Pick<ThemeImages, "srcSet">).map(
    ([key, { srcSet }]) => (
      <link rel="preload" as="image" imageSrcSet={srcSet} key={key} />
    )
  );
  return (
    <>
      {links}
      <div
        className={classNames(styles["App"], Theme)}
        style={style ? style : { overflowY: "scroll" }}
        {...rest}
      >
        {children}
      </div>
    </>
  );
};

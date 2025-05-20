import classNames from "clsx";
import * as React from "react";
import styles from "./App.module.css";
import { getCss } from "./css/getCss.js";
import { Favicons } from "./layout/Favicons.js";
import { MetaTags } from "./layout/MetaTags.js";

type AppType = ThemeComponent<{
  pathInfo: ["theme"];
  favicons: true;
  title: true;
  description: true;
  published: true;
  updated: true;
  image: true;
  tags: true;
  url: true;
  contentType: true;
  category: true;
  twitter: true;
}>;

export const App: AppType = ({
  children,
  style,
  pathInfo,
  favicons,
  title,
  description,
  published,
  updated,
  image,
  tags,
  url,
  contentType,
  category,
  twitter,
  ...rest
}) => {
  const themeClass = getCss(pathInfo.theme, "Theme");
  return (
    <>
      <title key={title}>{title}</title>
      <Favicons favicons={favicons} />
      <MetaTags title={title} description={description} />
      <div className={classNames(styles["App"], themeClass)} {...rest}>
        {children}
      </div>
    </>
  );
};

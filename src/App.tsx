import * as React from "react";
import styles from "./App.module.css";
import { Favicons } from "./layout/Favicons.js";
import { MetaTags } from "./layout/MetaTags.js";

type AppType = ThemeComponent<{
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

/**
 * Theme-agnostic app shell. The theme `.Theme` class (its CSS custom
 * properties) is applied by a theme layout's wrapper div — a static per-theme
 * `route.tsx` for migrated themes, or the dynamic `app/$theme/route.tsx` for the
 * rest — so App no longer pulls the all-themes CSS barrel.
 */
export const App: AppType = ({
  children,
  style,
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
  return (
    <>
      <title key={title}>{title}</title>
      <Favicons favicons={favicons} />
      <MetaTags title={title} description={description} />
      <div className={styles["App"]} {...rest}>
        {children}
      </div>
    </>
  );
};

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
 * properties) is applied by each theme's `app/<theme>/route.tsx` layout wrapper
 * div, so App carries no theme knowledge and pulls no CSS barrel.
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

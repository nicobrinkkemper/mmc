import classNames from "classnames";
import * as React from "react";
import styles from "./Logo.module.css";
import { ThemeLogoStatic } from "./ThemeLogo.js";

export type LogoStaticProps = React.PropsWithChildren<{
  logo?: logoImageTypes;
  small?: boolean;
  className?: string;
  theme: Theme;
  images: ThemeImages;
  pathInfo: ThemePathInfo;
  nextAndPrevTheme?: ThemePropsNextAndPrev;
  clickable: React.ElementType;
}>;
export const LogoStatic = ({
  logo = "logo",
  small = false,
  className,
  theme,
  images,
  pathInfo,
  nextAndPrevTheme,
  clickable: Clickable = "a",
}: LogoStaticProps) => {
  const size = small ? "small" : "big";
  return (
    <>
      <Clickable
        href={pathInfo.themeSlug}
        className={classNames(
          className,
          styles["Logo"],
          styles[size],
          styles[logo as keyof typeof styles]
        )}
      >
        <ThemeLogoStatic
          small={small}
          logo={logo}
          theme={theme}
          images={images}
        />
      </Clickable>

      {nextAndPrevTheme?.prevTheme.exists === true ? (
        <Clickable
          className={styles["PrevTheme"]}
          href={
            pathInfo.isCredits
              ? nextAndPrevTheme.prevTheme.theme.pathInfo.toCredits
              : pathInfo.isBatches
              ? nextAndPrevTheme.prevTheme.theme.pathInfo.toLevels
              : nextAndPrevTheme.prevTheme.theme.pathInfo.themeSlug
          }
        >
          <ThemeLogoStatic
            theme={nextAndPrevTheme.prevTheme.theme.theme}
            small
            logo="logo_simple"
            images={nextAndPrevTheme.prevTheme.theme.images}
          />
        </Clickable>
      ) : null}
      {nextAndPrevTheme?.nextTheme.exists === true ? (
        <Clickable
          className={styles["NextTheme"]}
          href={
            pathInfo.isCredits
              ? nextAndPrevTheme.nextTheme.theme.pathInfo.toCredits
              : pathInfo.isBatches
              ? nextAndPrevTheme.nextTheme.theme.pathInfo.toLevels
              : nextAndPrevTheme.nextTheme.theme.pathInfo.themeSlug
          }
        >
          <ThemeLogoStatic
            theme={nextAndPrevTheme.nextTheme.theme.theme}
            small
            logo="logo_simple"
            images={nextAndPrevTheme.nextTheme.theme.images}
          />
        </Clickable>
      ) : null}
    </>
  );
};

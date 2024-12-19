import * as React from "react";
import { AppStatic } from "../../App.static.js";
import { BackToWelcome } from "../../components/BackButton.js";
import { mainTheme } from "../../config/constants.js";
import { Content } from "../../copy/Content.js";
import { LayoutStatic } from "../../layout/Layout.js";
import styles from "./Credits.module.css";

export type CreditPageProps = {
  theme: Theme;
  images: ThemeImages;
  pathInfo: ThemePathInfo;
  nextAndPrevTheme: ThemePropsNextAndPrev;
} & Clickable;

export function CreditsPageStatic({
  theme = mainTheme,
  images,
  pathInfo,
  nextAndPrevTheme,
  clickable,
}: CreditPageProps) {
  return (
    <AppStatic theme={theme}>
      <LayoutStatic
        type="special"
        theme={theme}
        images={images}
        pathInfo={pathInfo}
        nextAndPrevTheme={nextAndPrevTheme}
        clickable={clickable}
      >
        <BackToWelcome themeSlug={pathInfo.themeSlug} clickable={clickable} />
        <Content.Credits className={styles["CreditsCard"]} theme={theme} />
      </LayoutStatic>
    </AppStatic>
  );
}

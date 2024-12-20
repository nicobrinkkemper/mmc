import * as React from "react";
import { AppStatic } from "../../App.js";
import { mainTheme } from "../../config/constants.js";
import { Content } from "../../copy/Content.js";
import { LayoutStatic } from "../../layout/Layout.js";

export type StaticHomePageProps = {
  theme: Theme;
  images: ThemeImages;
  info: ThemeInfo;
  pathInfo: ThemePathInfo;
  nextAndPrevTheme: ThemePropsNextAndPrev;
  clickable?: React.ElementType;
};

export function HomePageStatic({
  theme = mainTheme,
  images,
  info,
  pathInfo,
  nextAndPrevTheme,
  clickable: Clickable = "a",
}: StaticHomePageProps) {
  return (
    <AppStatic theme={theme} images={images}>
      <LayoutStatic
        type="special"
        theme={theme}
        images={images}
        pathInfo={pathInfo}
        nextAndPrevTheme={nextAndPrevTheme}
        clickable={Clickable}
      >
        <Content.Welcome
          theme={theme}
          images={images}
          info={info}
          pathInfo={pathInfo}
          clickable={Clickable}
        />
      </LayoutStatic>
    </AppStatic>
  );
}

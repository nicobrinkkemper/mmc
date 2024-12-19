import * as React from "react";
import { AppStatic } from "../../App.static.js";
import { mainTheme } from "../../config/constants.js";
import { Content } from "../../copy/Content.js";
import { LayoutStatic } from "../../layout/Layout.js";

export type StaticHomePageProps = {
  theme: Theme;
  images: Themes[Theme]["images"];
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
    <AppStatic theme={theme}>
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

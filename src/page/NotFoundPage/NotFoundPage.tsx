import * as React from "react";
import { AppStatic } from "../../App.static.js";
import { LayoutStatic } from "../../layout/Layout.js";
import { NotFoundStatic } from "./NotFound.js";

type NotFoundPageProps = Pick<
  ThemeStaticData,
  "theme" | "images" | "pathInfo"
> & {
  error?: string;
} & Clickable;

export function NotFoundPageStatic({
  error,
  theme,
  images,
  pathInfo,
  clickable,
}: NotFoundPageProps) {
  return (
    <AppStatic theme={theme}>
      <LayoutStatic
        type="simple"
        small
        theme={theme}
        images={images}
        pathInfo={pathInfo}
        clickable={clickable}
      >
        <NotFoundStatic
          error={error}
          pathInfo={pathInfo}
          clickable={clickable}
        />
      </LayoutStatic>
    </AppStatic>
  );
}

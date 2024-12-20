import * as React from "react";
import { AppStatic } from "../../App.js";
import { LayoutStatic } from "../../layout/Layout.js";
import { NotFoundStatic } from "./NotFound.js";

type NotFoundPageProps = ThemeStaticData<"/404"> &
  Clickable & { error?: string };

export function NotFoundPageStatic({
  theme,
  images,
  pathInfo,
  clickable,
  error,
}: NotFoundPageProps) {
  return (
    <AppStatic theme={theme} images={images}>
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

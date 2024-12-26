import * as React from "react";
import { AppStatic } from "../../App.js";
import { Layout } from "../../layout/Layout.js";
import { NotFoundStatic } from "./NotFound.js";

export const NotFoundPageStatic: ThemePageComponent<`/${MainTheme}`> = ({
  images,
  pathInfo,
  clickable,
}) => {
  return (
    <AppStatic pathInfo={{ theme: pathInfo.theme }}>
      <Layout
        type="simple"
        small
        images={images}
        pathInfo={pathInfo}
        clickable={clickable}
        adjacent={undefined as never}
      >
        <NotFoundStatic pathInfo={pathInfo} clickable={clickable} />
      </Layout>
    </AppStatic>
  );
};

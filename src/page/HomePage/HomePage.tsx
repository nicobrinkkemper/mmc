import * as React from "react";
import { AppStatic } from "../../App.js";
import { Content } from "../../copy/Content.js";
import { Layout } from "../../layout/Layout.js";

export const HomePageStatic: HomePageType = ({
  images,
  info,
  pathInfo,
  adjacent,
  clickable,
}) => {
  return (
    <AppStatic pathInfo={pathInfo}>
      <Layout
        type="special"
        images={images}
        pathInfo={pathInfo}
        adjacent={adjacent}
        clickable={clickable}
      >
        <Content.Welcome
          images={images}
          info={info}
          pathInfo={pathInfo}
          clickable={clickable}
        />
      </Layout>
    </AppStatic>
  );
};

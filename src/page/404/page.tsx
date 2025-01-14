import * as React from "react";
import { App } from "../../App.js";
import { Layout } from "../../layout/Layout.js";
import { NotFound } from "./NotFound.js";
import { type RouteType } from "./props.js";

export const Page: ThemePageComponent<RouteType> = ({
  images,
  pathInfo: { theme, toHome, toCredits, toLevels, search },
  clickable,
}) => {
  return (
    <App pathInfo={{ theme }}>
      <Layout
        small
        images={images}
        pathInfo={{
          toHome,
          toCredits,
        }}
        clickable={clickable}
        adjacent={undefined as never}
      >
        <NotFound
          pathInfo={{ toHome, toLevels, search }}
          clickable={clickable}
        />
      </Layout>
    </App>
  );
};

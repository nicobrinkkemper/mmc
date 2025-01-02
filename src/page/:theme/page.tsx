import * as React from "react";
import { WithAbout } from "../../about/WithAbout.js";
import { App } from "../../App.js";
import { Content } from "../../copy/Content.js";
import { Layout } from "../../layout/Layout.js";
import { type RouteType } from "./props.js";

export const Page: ThemePageComponent<RouteType> = ({
  images: { logo, logo_special, illustration },
  info: { writtenOut, themeYear, caps, snake },
  pathInfo: { toHome, toLevels, theme, toCredits, toAbout, hash, to },
  adjacent,
  clickable,
  accordion,
}) => {
  return (
    <App pathInfo={{ theme }}>
      <WithAbout
        pathInfo={{ theme, toAbout, hash }}
        closeProps={{ href: to }}
        info={{ writtenOut, caps, snake }}
        clickable={clickable}
        accordion={accordion}
      >
        <Layout
          images={{
            logo: logo_special ?? logo,
          }}
          pathInfo={{
            toHome,
            toCredits,
          }}
          adjacent={adjacent}
          clickable={clickable}
        >
          <Content.Welcome
            images={{ illustration }}
            info={{ writtenOut, themeYear }}
            pathInfo={{ toLevels, theme }}
            clickable={clickable}
          />
        </Layout>
      </WithAbout>
    </App>
  );
};

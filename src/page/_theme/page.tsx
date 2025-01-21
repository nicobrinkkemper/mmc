import * as React from "react";
import { App } from "../../App.js";
import { Content } from "../../copy/Content.js";
import { Favicons } from "../../layout/Favicons.js";
import { Layout } from "../../layout/Layout.js";
import { type RouteType } from "./props.js";

export const Page: ThemePageComponent<RouteType> = ({
  images: { logo, logo_special, illustration, favicons },
  info: { writtenOut, themeYear, caps, ordinal },
  pathInfo: { toHome, toLevels, theme, toCredits, toAbout, hash, to },
  adjacent,
  clickable,
  accordion,
}) => {
  return (
    <>
      <App pathInfo={{ theme }}>
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
      </App>
      <title>{`${caps} | Celebrating ${ordinal} years of Mario Maker!`}</title>
      <meta
        name="description"
        content={`${caps} | Celebrating ${ordinal} years of Mario Maker!`}
      />
      <Favicons favicons={favicons} />
    </>
  );
};

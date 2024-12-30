import * as React from "react";
import { App } from "../../../App.js";
import { Button } from "../../../components/Button.js";
import { Content } from "../../../copy/Content.js";
import { Layout } from "../../../layout/Layout.js";
import styles from "./Credits.module.css";
import { type RouteType } from "./props.js";

export const Page: ThemePageComponent<RouteType> = ({
  images,
  pathInfo: { toHome, toCredits, theme },
  adjacent,
  clickable,
}) => {
  return (
    <App pathInfo={{ theme }}>
      <Layout
        images={images}
        pathInfo={{
          toCredits,
          toHome,
        }}
        adjacent={adjacent}
        clickable={clickable}
      >
        <Button
          icon="arrow-left-inverted"
          iconPosition="left"
          href={toHome}
          inverted={true}
          clickable={clickable}
        >
          to Welcome
        </Button>
        <Content.Credits
          className={styles["CreditsCard"]}
          clickable={clickable}
          pathInfo={{ theme }}
        />
      </Layout>
    </App>
  );
};

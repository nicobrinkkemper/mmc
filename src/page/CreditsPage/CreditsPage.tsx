import * as React from "react";
import { AppStatic } from "../../App.js";
import { Button } from "../../components/Button.js";
import { Content } from "../../copy/Content.js";
import { Layout } from "../../layout/Layout.js";
import styles from "./Credits.module.css";

export const CreditsPageStatic: CreditsPageType = ({
  images,
  pathInfo,
  adjacent,
  clickable,
}) => {
  return (
    <AppStatic pathInfo={{ theme: pathInfo.theme }}>
      <Layout
        type="special"
        images={images}
        pathInfo={pathInfo}
        adjacent={adjacent}
        clickable={clickable}
      >
        <Button
          icon="arrow-left-inverted"
          iconPosition="left"
          href={pathInfo.toHome}
          inverted={true}
          clickable={clickable}
        >
          Back to Welcome
        </Button>
        <Content.Credits
          className={styles["CreditsCard"]}
          pathInfo={pathInfo}
          clickable={clickable}
        />
      </Layout>
    </AppStatic>
  );
};

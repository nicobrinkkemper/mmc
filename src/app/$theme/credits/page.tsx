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
  favicons,
  published,
  updated,
  twitter,
  contentType,
  category,
  tags,
  url,
  title,
  description,
  image,
}) => {
  return (
    <>
      <App
        pathInfo={{ theme }}
        favicons={favicons}
        published={published}
        updated={updated}
        twitter={twitter}
        contentType={contentType}
        category={category}
        tags={tags}
        url={url}
        title={title}
        description={description}
        image={image}
      >
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
    </>
  );
};

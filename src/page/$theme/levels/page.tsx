import * as React from "react";
import { App } from "../../../App.js";
import { Button } from "../../../components/Button.js";
import { Layout } from "../../../layout/Layout.js";
import { BatchList } from "./BatchList.js";
import { type RouteType } from "./props.js";

export const Page: ThemePageComponent<RouteType> = ({
  batches,
  images,
  pathInfo,
  clickable,
  adjacent,
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
    <App
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
      pathInfo={{
        theme: pathInfo.theme,
      }}
    >
      <Layout
        images={images}
        pathInfo={{
          toHome: pathInfo.toHome,
          toCredits: pathInfo.toCredits,
        }}
        clickable={clickable}
        adjacent={adjacent}
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
        <BatchList
          batches={batches}
          clickable={clickable}
          pathInfo={pathInfo}
        />
      </Layout>
    </App>
  );
};

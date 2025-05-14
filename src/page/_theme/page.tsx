import * as React from "react";
import { App } from "../../App.js";
import { Content } from "../../copy/Content.js";
import { Layout } from "../../layout/Layout.js";
import { type RouteType } from "./props.js";

export const Page: ThemePageComponent<RouteType | "/"> = (props) => {
  if (!props) {
    throw new Error("props is undefined");
  }
  const {
    images: {
      logo,
      logo_special,
      illustration,
      favicon,
      favicon_512x512,
      favicon_192x192,
      favicon_64x64,
    },
    info: { writtenOut, themeYear, caps, ordinal },
    pathInfo: { toHome, toLevels, theme, toCredits, toAbout, hash, to },
    adjacent,
    clickable,
    accordion,
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
  } = props;
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
    </>
  );
};

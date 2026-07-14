import React from "react";
import { App } from "../../App.js";
import { Content } from "../../copy/Content.js";
import { Layout } from "../../layout/Layout.js";
import { type RouteType } from "./props.js";

export const Page: ThemePageComponent<RouteType | "/"> = (props) => {
  if (!props) {
    throw new Error("props is undefined");
  } else if(!("images" in props) || !props.images) {
    throw new Error("props.images is undefined. It's likely that the props function didn't get the correct route.");
  }
  const {
    images: { logo, logo_special, illustration },
    info,
    pathInfo,
    accordion,
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
  } = props;
  const { writtenOut, themeYear } = info;
  const { toLevels, theme } = pathInfo;
  return (
    <>
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
      >
        <Layout
          images={{
            logo: logo_special ?? logo,
          }}
          info={info}
          pathInfo={pathInfo}
          accordion={accordion}
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

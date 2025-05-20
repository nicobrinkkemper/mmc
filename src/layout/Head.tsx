import React from "react";
import { defaultTitle } from "../config/themeConfig.js";
import { StaticMetaTags } from "./MetaTags.js";

type HeadType = ThemeComponent<{
  title: true;
  description: true;
  url: true;
  contentType: true;
  published: true;
  updated: true;
  category: true;
  tags: true;
  twitter: true;
  image: true;
}>;

export const Head: HeadType = ({
  title = defaultTitle,
  description,
  url,
  contentType,
  published,
  updated,
  category,
  tags,
  twitter,
  image,
}) => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/css/flag-icon.min.css"
      />
      <StaticMetaTags
        title={title}
        description={description}
        url={url}
        contentType={contentType}
        published={published}
        updated={updated}
        category={category}
        tags={tags}
        twitter={twitter}
        image={image}
      />
    </>
  );
};

import React from "react";
import { absoluteUrl } from "../config/env.server.js";

const defaultTitle = "Official Mario Maker Celebration Site";
const defaultDescription =
  "Each year, we celebrate the best levels from Mario Maker! Check out the best levels from the past year!";

type MetaTagsType = ThemeComponent<{
  title: true;
  description: true;
}>;

export const MetaTags: MetaTagsType = ({
  title = defaultTitle,
  description = defaultDescription,
}) => {
  const metaTags = [
    { name: "viewport", content: `width=device-width,initial-scale=1` },
    { name: "description", content: description },
    { name: "title", content: title },
  ];

  return (
    <>
      {Object.entries(metaTags).map(([key, value]) => (
        <meta key={key} {...value} />
      ))}
    </>
  );
};

type StaticMetaTagsType = ThemeComponent<{
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

export const StaticMetaTags: StaticMetaTagsType = ({
  title = defaultTitle,
  description = defaultDescription,
  url = absoluteUrl("/"),
  contentType = "text/html; charset=UTF-8",
  published = new Date().toISOString(),
  updated = new Date().toISOString(),
  category = "Mario Maker",
  tags = ["Mario Maker", "Celebration", "Levels"],
  twitter = "summary_large_image",
  image = absoluteUrl("images/favicon-512x512.png"),
}) => {
  const metaTags = [
    { name: "html-charset", content: "utf-8" },
    {
      name: "twitter:title",
      content: `${title} | ${url}`,
    },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: "@bbmariomaker2" },
    { name: "og:title", content: `${title} | ${url}` },
    { name: "og:type", content: contentType },
    { name: "og:url", content: url },
    { name: "og:description", content: description },
    { name: "og:site_name", content: url },
    { name: "og:locale", content: "en_EN" },
  ];
  if (process.env["NODE_ENV"] === "production") {
    metaTags.push({ name: "robots", content: "noindex" });
  }

  if (published)
    metaTags.push({ name: "article:published_time", content: published });
  if (updated)
    metaTags.push({ name: "article:modified_time", content: updated });
  if (category) metaTags.push({ name: "article:section", content: category });
  if (tags) metaTags.push({ name: "article:tag", content: tags.join(",") });
  if (image) {
    metaTags.push({ name: "image", content: image });
    metaTags.push({ name: "twitter:image", content: image });
    metaTags.push({ name: "og:image", content: image });
    metaTags.push({ name: "twitter:card", content: twitter });
    metaTags.push({ name: "twitter:image:alt", content: title });
  } else {
    metaTags.push({ name: "twitter:card", content: twitter });
  }

  return (
    <>
      {Object.entries(metaTags).map(([key, value]) => (
        <meta key={key} {...value} />
      ))}
    </>
  );
};
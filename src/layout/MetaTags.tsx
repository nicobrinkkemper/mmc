import * as React from "react";
import { BASE_URL } from "../config/constants.js";

export const MetaTags = ({
  title,
  description,
  url,
  contentType,
  published,
  updated,
  category,
  tags,
  twitter,
  image,
}: Pick<
  Required<HtmlProps>,
  | "title"
  | "description"
  | "url"
  | "contentType"
  | "published"
  | "updated"
  | "category"
  | "tags"
  | "twitter"
  | "image"
>) => {
  const metaTags = [
    { itemprop: "name", content: title },
    { itemprop: "description", content: description },
    { name: "viewport", content: `width=device-width,initial-scale=1` },
    { name: "description", content: description },
    { name: "twitter:title", content: `${title} | ${BASE_URL}` },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: "@bbmariomaker2" },
    { name: "og:title", content: `${title} | ${BASE_URL}` },
    { name: "og:type", content: contentType },
    { name: "og:url", content: url },
    { name: "og:description", content: description },
    { name: "og:site_name", content: `${BASE_URL}` },
    { name: "og:locale", content: "en_EN" },
  ];

  if (published)
    metaTags.push({ name: "article:published_time", content: published });
  if (updated)
    metaTags.push({ name: "article:modified_time", content: updated });
  if (category) metaTags.push({ name: "article:section", content: category });
  if (tags) metaTags.push({ name: "article:tag", content: tags.join(",") });
  if (image) {
    metaTags.push({ itemprop: "image", content: image });
    metaTags.push({ name: "twitter:image", content: image });
    metaTags.push({ name: "og:image", content: image });
    metaTags.push({ name: "twitter:card", content: twitter });
    metaTags.push({ name: "twitter:image:alt", content: title });
  } else {
    metaTags.push({ name: "twitter:card", content: twitter });
  }

  return (
    <>
      {metaTags.map((tag) => (
        <meta key={`meta-${tag?.name || tag?.itemprop}`} {...tag} />
      ))}
    </>
  );
};

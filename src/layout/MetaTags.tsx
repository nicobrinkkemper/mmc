import React from "react";

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
  baseUrl,
  publicUrl,
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
  | "baseUrl"
  | "publicUrl"
>) => {
  const baseUrlWithPublicUrl = `${baseUrl}${publicUrl}`;
  const metaTags = [
    { itemProp: "name", content: title },
    { itemProp: "description", content: description },
    { name: "viewport", content: `width=device-width,initial-scale=1` },
    { name: "description", content: description },
    { name: "twitter:title", content: `${title} | ${baseUrlWithPublicUrl}` },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: "@bbmariomaker2" },
    { name: "og:title", content: `${title} | ${baseUrlWithPublicUrl}` },
    { name: "og:type", content: contentType },
    { name: "og:url", content: url },
    { name: "og:description", content: description },
    { name: "og:site_name", content: `${baseUrlWithPublicUrl}` },
    { name: "og:locale", content: "en_EN" },
  ];

  if (published)
    metaTags.push({ name: "article:published_time", content: published });
  if (updated)
    metaTags.push({ name: "article:modified_time", content: updated });
  if (category) metaTags.push({ name: "article:section", content: category });
  if (tags) metaTags.push({ name: "article:tag", content: tags.join(",") });
  if (image) {
    metaTags.push({ itemProp: "image", content: image });
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

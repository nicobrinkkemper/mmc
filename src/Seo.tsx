import { startDate } from "useLevelData";
import * as React from "react";
import { Helmet } from "react-helmet-async";
import { BASE_URL, DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "./constants";

const absoluteUrl = (path: string) => `${BASE_URL}${path}`;

type getMetaTagsProps = {
  title: string;
  description: string;
  url: string;
  contentType: string;
  published: string;
  updated: string;
  category: string;
  tags: string[];
  twitter: string;
  image: string;
};
const getMetaTags = ({
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
}: getMetaTagsProps) => {
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
    metaTags.push({ itemprop: "image", content: absoluteUrl(image) });
    metaTags.push({ name: "twitter:image", content: absoluteUrl(image) });
    metaTags.push({ name: "og:image", content: absoluteUrl(image) });
    metaTags.push({ name: "twitter:card", content: twitter });
    metaTags.push({ name: "twitter:image:alt", content: title });
  } else {
    metaTags.push({ name: "twitter:card", content: twitter });
  }

  return metaTags;
};

type getHtmlAttributesProps = {
  schema?: string;
};
const getHtmlAttributes = ({ schema }: getHtmlAttributesProps) => {
  let result = {
    lang: "en",
  };
  if (schema) {
    return {
      ...result,
      itemscope: undefined,
      itemtype: `http://schema.org/${schema}`,
    };
  }
  return result;
};

type SeoProps = {
  schema?: string;
  title?: string;
  description?: string;
  path?: string;
  contentType?: string;
  published?: string;
  updated?: string;
  category?: string;
  tags?: string[];
  twitter?: string;
  image?: string;
};
type getLinkTagsProps = {
  path: string;
};
const getLinkTags = ({ path }: getLinkTagsProps) => [
  { rel: "canonical", href: absoluteUrl(path) },
  { rel: "icon", href: `${absoluteUrl(path)}/favicon.ico` },
  {
    rel: "icon",
    sizes: "16x16",
    href: `${absoluteUrl(path)}/favicon-16x16.png`,
  },
  {
    rel: "icon",
    sizes: "32x32",
    href: `${absoluteUrl(path)}/favicon-32x32.png`,
  },
  {
    rel: "apple-icon",
    href: `${absoluteUrl(path)}/apple-icon.png`,
  },
  {
    rel: "apple-touch-icon",
    href: `${absoluteUrl(path)}/apple-touch-icon.png`,
  },
  { rel: "msapplication-TileColor", content: `#FFF` },
  { name: "theme-color", content: `#FFF` },
  { rel: "manifest", href: `/site.webmanifest` },
];
const Seo = ({
  schema,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "",
  contentType = "image/png",
  published = startDate.toDateString(),
  updated = new Date(Date.now()).toDateString(),
  category = "gaming",
  tags = [DEFAULT_TITLE, "MarioMaker2"],
  twitter = "summary",
  image = "/android-chrome-512x512.png",
}: SeoProps) => (
  <Helmet
    htmlAttributes={getHtmlAttributes({
      schema,
    })}
    title={title}
    link={getLinkTags({ path })}
    meta={getMetaTags({
      title,
      description,
      contentType,
      url: absoluteUrl(path),
      published,
      updated,
      category,
      tags,
      twitter,
      image,
    })}
  />
);

export { Seo };
export default Seo;

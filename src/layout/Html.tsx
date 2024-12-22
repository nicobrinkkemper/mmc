import * as React from "react";
import { BASE_URL } from "../config/constants.js";
import { siteName } from "../config/themeConfig.js";
export const absoluteUrl = (path: string = "") => {
  if (path.startsWith("http")) return path;
  if (path.startsWith("/")) return `${BASE_URL}${path}`;
  return `${BASE_URL}/${path}`;
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
    metaTags.push({ itemprop: "image", content: image });
    metaTags.push({ name: "twitter:image", content: image });
    metaTags.push({ name: "og:image", content: image });
    metaTags.push({ name: "twitter:card", content: twitter });
    metaTags.push({ name: "twitter:image:alt", content: title });
  } else {
    metaTags.push({ name: "twitter:card", content: twitter });
  }

  return metaTags;
};

export function Html({
  title = "",
  description = siteName,
  contentType = "image/png",
  updated = new Date(Date.now()).toDateString(),
  category = "gaming",
  tags = ["Mario Maker 2", "Mario Maker Community Levels", "Mario Anniversary"],
  twitter = "summary",
  image = "",
  assets: _,
  info,
  batches,
  images,
  assets,
}: Readonly<HtmlProps>) {
  const published = batches?.[0]?.releaseDate.formatted ?? "";
  if (title === "") title = info.caps;
  tags.push(info.caps);

  const metaTags = getMetaTags({
    title,
    description,
    contentType,
    url: absoluteUrl(info.slug),
    published,
    updated,
    category,
    tags,
    twitter,
    image: absoluteUrl(
      image !== "" ? image : images?.["favicon_512x512"].src ?? ""
    ),
  });

  return (
    <>
      <meta html-charset="utf-8" />
      <title>{title}</title>
      {metaTags.map((tag, index) => {
        const attrs = { ...tag };
        return <meta key={`meta-${index}`} {...attrs} />;
      })}
      <link rel="icon" href={absoluteUrl(images?.["favicon"].src ?? "")} />
      <link
        rel="icon"
        sizes="64x64"
        href={absoluteUrl(images?.["favicon_512x512"].src ?? "")}
      />
      <link
        rel="icon"
        sizes="192x192"
        href={absoluteUrl(images?.["favicon_192x192"].src ?? "")}
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/css/flag-icon.min.css"
      />
      <style>{`body { -webkit - font - smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
* { padding: 0; margin: 0; min-width: 0; box-sizing: border-box; }
img { max-width: 100%; object-fit: cover; color: transparent; }
strong { font-weight: bold; }`}</style>
      {assets?.main && (
        <script type="module" crossOrigin={""} src={assets.main} />
      )}
      {assets?.imports?.map((imp, i) => (
        <link key={i} rel="modulepreload" crossOrigin={""} href={imp} />
      ))}
      {assets?.css?.map((css, i) => (
        <link key={i} rel="stylesheet" crossOrigin={""} href={css} />
      ))}
    </>
  );
}

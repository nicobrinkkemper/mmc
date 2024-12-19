import * as React from "react";
import { BASE_URL, DEFAULT_DESCRIPTION } from "../config/constants.js";
export const absoluteUrl = (path = "") => {
    if (path.startsWith("http"))
        return path;
    if (path.startsWith("/"))
        return `${BASE_URL}${path}`;
    return `${BASE_URL}/${path}`;
};
const getMetaTags = ({ title, description, url, contentType, published, updated, category, tags, twitter, image, }) => {
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
    if (category)
        metaTags.push({ name: "article:section", content: category });
    if (tags)
        metaTags.push({ name: "article:tag", content: tags.join(",") });
    if (image) {
        metaTags.push({ itemprop: "image", content: image });
        metaTags.push({ name: "twitter:image", content: image });
        metaTags.push({ name: "og:image", content: image });
        metaTags.push({ name: "twitter:card", content: twitter });
        metaTags.push({ name: "twitter:image:alt", content: title });
    }
    else {
        metaTags.push({ name: "twitter:card", content: twitter });
    }
    return metaTags;
};
export function Html({ children, title = "", description = DEFAULT_DESCRIPTION, contentType = "image/png", updated = new Date(Date.now()).toDateString(), category = "gaming", tags = ["Mario Maker 2", "Mario Maker Community Levels", "Mario Anniversary"], twitter = "summary", image = "", assets: _, info, batches, images, }) {
    const published = batches?.[0]?.releaseDate.formatted ?? "";
    if (title === "")
        title = info.caps;
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
        image: absoluteUrl(image !== "" ? image : images?.favicon_512x512.src ?? ""),
    });
    return (React.createElement("html", { "data-rh": "lang", lang: "en" },
        React.createElement("head", null,
            React.createElement("meta", { "html-charset": "utf-8" }),
            React.createElement("title", null, title),
            metaTags.map((tag, index) => {
                const attrs = { ...tag };
                return React.createElement("meta", { key: `meta-${index}`, ...attrs });
            }),
            React.createElement("link", { rel: "icon", href: absoluteUrl(images?.favicon.src ?? "") }),
            React.createElement("link", { rel: "icon", sizes: "64x64", href: absoluteUrl(images?.favicon_512x512.src ?? "") }),
            React.createElement("link", { rel: "icon", sizes: "192x192", href: absoluteUrl(images?.favicon_192x192.src ?? "") }),
            React.createElement("link", { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/css/flag-icon.min.css" }),
            React.createElement("style", null, `body { -webkit - font - smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
* { padding: 0; margin: 0; min-width: 0; box-sizing: border-box; }
img { max-width: 100%; object-fit: cover; color: transparent; }
strong { font-weight: bold; }`)),
        React.createElement("body", null,
            React.createElement("div", { id: "root" }, children))));
}
//# sourceMappingURL=Html.js.map
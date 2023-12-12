import { Helmet } from "react-helmet-async";
import { BASE_URL, DEFAULT_DESCRIPTION } from "./constants";
import { useLevelData } from "./useLevelData";
import { useTheme } from "./theme/useTheme";

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
const getLinkTags = ({ path, favicon }: {
  path: string;
  favicon: string
}) => [
    { rel: "icon", href: `${absoluteUrl(path)}${favicon}` },
    {
      rel: "icon",
      sizes: "32x32",
      href: `${absoluteUrl(path)}favicon-32x32.ico`,
    }, {
      rel: "icon",
      sizes: "64x64",
      href: `${absoluteUrl(path)}favicon-32x32.ico`,
    },
    { rel: "manifest", href: `${absoluteUrl(path)}site.webmanifest` },
  ];
const Seo = ({
  schema,
  title = '',
  favicon = 'favicon.ico',
  description = DEFAULT_DESCRIPTION,
  contentType = "image/png",
  updated = new Date(Date.now()).toDateString(),
  category = "gaming",
  tags = ["Mario Maker 2"],
  twitter = "summary",
  image = '',
}: Omit<SeoProps, 'published' | 'path'> & { favicon?: string }) => {
  const published = useLevelData().startDate.toDateString();
  const { themeSlug, info: { caps } } = useTheme();
  if (image === '') image = `${themeSlug}android-chrome-512x512.png`;
  if (title === '') title = caps
  tags.push(caps);
  return (
    <Helmet
      htmlAttributes={getHtmlAttributes({
        schema,
      })}
      title={title}
      link={getLinkTags({ path: themeSlug, favicon })}
      meta={getMetaTags({
        title,
        description,
        contentType,
        url: absoluteUrl(themeSlug),
        published,
        updated,
        category,
        tags,
        twitter,
        image: `${image}`,
      })}
    />
  )
};

export { Seo };
export default Seo;

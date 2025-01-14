import * as React from "react";
import { Assets } from "./Assets.js";
import { Favicons } from "./Favicons.js";
import { Head } from "./Head.js";
import { MetaTags } from "./MetaTags.js";

export function Html({
  children,
  assets,
  favicons,
  title,
  description,
  contentType,
  url,
  published,
  updated,
  category,
  tags,
  twitter,
  image,
  baseUrl,
  publicUrl,
}: React.PropsWithChildren<Required<HtmlProps>>) {
  return (
    <>
      <Head title={title} />
      <MetaTags
        title={title}
        description={description}
        contentType={contentType}
        url={url}
        published={published}
        updated={updated}
        category={category}
        tags={tags}
        twitter={twitter}
        image={image}
        baseUrl={baseUrl}
        publicUrl={publicUrl}
      />
      <Favicons favicons={favicons} baseUrl={baseUrl} publicUrl={publicUrl} />
      <Assets assets={assets} />
      {children}
    </>
  );
}

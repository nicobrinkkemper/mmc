import type { ReactNode } from "react";

declare global {
  type HtmlAssets = {
    main: string;
    imports: string[];
    css: string[];
  };

  type HtmlProps = {
    schema?: string;
    title?: string;
    description?: string;
    contentType?: string;
    updated?: string;
    category?: string;
    tags?: string[];
    twitter?: string;
    image?: string;
    assets?: HtmlAssets;
    children: ReactNode;
    info: ThemeInfo;
    batches?: ThemeBatch<`/${Theme}/levels/${NumberParam}`>[];
    images?: ThemeImages;
  };

  type Clickable = {
    clickable: React.ElementType | "a" | "button";
  };

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
}

export {};


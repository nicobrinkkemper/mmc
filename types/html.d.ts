import type { ReactNode } from "react";

declare global {
  type HtmlProps = {
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
    schema?: string;
    assets?: {
      main: string;
      imports: string[];
      css: string[];
    };
    images: Images[Theme];
    children: ReactNode;
  };

  type Clickable = {
    clickable: React.ElementType | "a" | "button";
  };
}

export {};


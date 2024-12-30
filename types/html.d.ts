declare global {
  type HtmlProps = {
    title?: string;
    description?: string;
    url?: string;
    contentType?: string;
    published?: string;
    updated?: string;
    category?: string;
    tags?: string[];
    twitter?: string;
    image?: string;
    schema?: string;
    assets?: {
      main?: string;
      imports?: string[];
      css?: string[];
    };
    favicons: {
      favicon_512x512: string;
      favicon_192x192: string;
      favicon_64x64: string;
      favicon: string;
    };
  };

  type HeadDefaultOpt = {
    images: [
      "logo",
      "favicon",
      "favicon_512x512",
      "favicon_192x192",
      "favicon_64x64"
    ];
    info: ["writtenOut", "themeYear", "caps"];
    pathInfo: true;
  };

  type PropDefaultOpt = HeadDefaultOpt & {
    clickable: true;
  };

  type CreateHeadFn = <R extends ValidRoute>(
    fn: ThemeUtil<PathMap[R], HeadDefaultOpt>
  ) => ThemeUtil<
    PathMap[R],
    HeadDefaultOpt,
    Partial<HtmlProps>,
    Required<HtmlProps> & ReturnType<typeof fn>
  >;

  type CreatePropsFn = <R extends ValidRoute>(
    route: ThemePathInfo<PathMap[R]>["route"],
    options: ThemeDataOptions<R>,
    fn: ThemeUtil<PathMap[R], typeof options & HeadDefaultOpt>
  ) => (
    to: string
  ) => ThemeData<PathMap[R], typeof options> & ReturnType<typeof fn>;

  type Clickable = {
    clickable: React.ElementType | "a" | "button";
  };
}

export {};

declare global {
  type HtmlHeadProps = {
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
    // schema?: string;
    // assets?: {
    //   main?: string;
    //   imports?: string[];
    //   css?: string[];
    // };
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
    info: true;
    pathInfo: true;
  };

  type PropDefaultOpt = HeadDefaultOpt & {
    clickable: true;
  };

  type CreatePropsAsyncFn = <
    R extends ValidRoute,
    Opt extends ThemeDataOptions,
    FN extends AsyncThemeUtil<R, Opt>
  >(
    route: R,
    options: Opt,
    fn: FN
  ) => (to: string) => Promise<ReturnType<FN> & ThemeStaticDataReturn<R, Opt>>;

  type CreatePropsFn = <
    R extends ValidRoute,
    Opt extends ThemeDataOptions,
    FN extends ThemeUtil<R, Opt, {}>
  >(
    route: R,
    options: Opt,
    fn: FN
  ) => (to: string) => Promise<ReturnType<FN> & ThemeStaticDataReturn<R, Opt>>;

  type Clickable = {
    clickable: React.ElementType | "a" | "button";
  };
}
export {};


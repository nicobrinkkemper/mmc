declare global {
  type ThemeStaticData<P extends ValidPath = ValidPath> = {
    pathInfo: ThemePathInfo<P>;
    theme: ThemePathInfo<P>["theme"];
    info: ThemeInfo<ThemePathInfo<P>["theme"]>;
    images: ThemeImages<ThemePathInfo<P>["theme"]>;
    nextAndPrevTheme: ThemePropsNextAndPrev;
    clickable: React.ElementType | "a" | "button";
    level: ThemePathInfo<P>["isLevel"] extends true
      ? ThemeLevel<`/${ThemePathInfo<P>["theme"]}/level/${NumberParam}/${NumberParam}`>
      : undefined;
    batch: ThemePathInfo<P>["isBatch"] extends true
      ? ThemeBatch<`/${ThemePathInfo<P>["theme"]}/levels/${NumberParam}`>
      : ThemePathInfo<P>["isLevel"] extends true
      ? ThemeBatch<`/${ThemePathInfo<P>["theme"]}/levels/${NumberParam}`>
      : undefined;
  } & ThemeBatches<ThemePathInfo<P>["theme"]>;
}

export {};


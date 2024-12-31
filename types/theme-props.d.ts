declare global {
  /**
   * `required` in our code means the same as writing `true`
   */
  type required = true;
  /**
   * `optional` in our code means the same as writing `boolean`
   */
  type optional = boolean;
  /**
   * `pickRequired` in our code means the same as writing a tuple of keys [key1, key2, key3]
   */
  type pickRequired<T extends readonly PropertyKey[]> = T;
  /**
   * `pickOptional` in our code means the same as writing a tuple of keys [key1, key2, key3] or an empty tuple []
   */
  type pickOptional<T extends readonly PropertyKey[]> = T | [];
  /**
   * `OptValue` is saying it's either `true` or `boolean`
   */
  type OptValue = required | optional;
  /**
   * `OptPick` is saying we can pick from the object
   */
  type OptPick<Keys extends readonly PropertyKey[]> =
    | pickRequired<Keys>
    | pickOptional<Keys>;

  /**
   * `WithOption` is a utility that takes the options and infers what it would be returning
   * We have a centralized place to handle the options for all components and pages.
   */
  type WithOption<Opt, Fallback> = Opt extends true
    ? Fallback
    : Opt extends readonly PropertyKey[]
    ? Opt extends pickRequired<readonly (keyof Fallback)[]>
      ? Required<Pick<Fallback, Opt[number]>>
      : Opt extends pickOptional<readonly (keyof Fallback)[]>
      ? Partial<Pick<Fallback, Opt[number]>>
      : Opt
    : Opt extends required
    ? Fallback
    : Opt extends optional
    ? Fallback | undefined
    : Opt extends Record<string, any>
    ? AdjacentPick<Opt> extends never
      ? {
          [k in keyof Opt]: k extends keyof Fallback
            ? WithOption<Opt[k], Fallback[k]>
            : never;
        }
      : AdjacentPick<Opt>
    : Fallback;

  /**
   * `ThemeDataOptions` is the type we can use to satisfy new options for theme components and pages.
   */
  type ThemeDataOptions<R extends ValidRoute = ValidRoute> = {
    pathInfo?: OptValue | OptPick<readonly (keyof ThemePathInfo<PathMap[R]>)[]>;
    batches?: OptValue | OptPick<string[]>;
    info?: OptValue | OptPick<readonly (keyof ThemeInfo<Theme>)[]>;
    images?: OptValue | OptPick<readonly (keyof ResizedImages)[]>;
    adjacent?:
      | OptValue
      | {
          pathInfo?: OptPick<readonly (keyof ThemePathInfo<PathMap[R]>)[]>;
          images?: OptPick<readonly (keyof ResizedImages)[]>;
        };
    batch?: OptValue | OptPick<readonly (keyof WithAdjacent<ThemeBatch>)[]>;
    level?: OptValue | OptPick<readonly (keyof WithAdjacent<ThemeLevel>)[]>;
    small?: OptValue;
    clickable?: OptValue;
  };

  /**
   * `ThemeDataMapping` defines how we map the options to the theme data.
   */
  type ThemeDataMapping<
    P extends ValidPath,
    PI extends Pick<ThemePathInfo<P>, "theme" | "params">
  > = {
    pathInfo: PI;
    batches: ThemeBatch[];
    info: ThemeInfo<PI["theme"]>;
    images: Images[PI["theme"]]["images"];
    adjacent: WithAdjacentTheme<PI>;
    batch: WithAdjacentBatch<PI>;
    level: WithAdjacentLevel<PI>;
    small?: boolean;
    clickable: React.ElementType | "button" | "a";
  };
}
// prettier-ignore
export { };

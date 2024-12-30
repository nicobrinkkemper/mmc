declare global {
  type AdjacentTheme<P, I> = {
    pathInfo: P extends (infer K extends keyof ThemePathInfo<ValidPath>)[]
      ? Required<Pick<ThemePathInfo<ValidPath>, K>>
      : never;
    images: I extends (infer K extends keyof ResizedImages)[]
      ? Required<Pick<ResizedImages, K>>
      : never;
  };

  type AdjacentPick<T> = T extends { pathInfo: infer P; images: infer I }
    ? {
        prev: Exists<AdjacentTheme<P, I>> | NotExists;
        next: Exists<AdjacentTheme<P, I>> | NotExists;
      }
    : never;

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

  type Exists<T> = {
    exists: true;
    value: T;
  };
  type NotExists = {
    exists: false;
    value?: never;
  };

  type WithAdjacent<T> = T & {
    adjacent: Adjacent<T[]>;
  };

  type Adjacent<Items extends unknown[]> = {
    next: Exists<Items[number]> | NotExists;
    prev: Exists<Items[number]> | NotExists;
  };

  type ExtractTheme<P> = P extends `/${infer T}/${string}` ? T : never;

  type Prev<T, K extends Primitive[]> = PrevInUnion<T, K>;
  type Next<T, K extends Primitive[]> = NextInUnion<T, K>;

  /**
   * Since our Prev/Next utils will return 9mmc as the prev of 4ymm, we add
   * a check here if it's equal to the last or first element of the tuple, if so the prev doesn't exist.
   */
  type InferAdjacent<T, Tuple extends Primitive[]> = {
    prev: Tuple[0] extends T ? NotExists : Exists<Tuple[0]>;
    next: Tuple[Subtract1<Tuple["length"]>] extends Next<T, Tuple>
      ? NotExists
      : Exists<Next<T, Tuple>>;
  };

  type required = true;
  type optional = boolean;
  type pickRequired<T extends readonly PropertyKey[]> = T;
  type pickOptional<T extends readonly PropertyKey[]> = T | [];

  type OptValue = required | optional;
  type OptPick<Keys extends readonly PropertyKey[]> =
    | pickRequired<Keys>
    | pickOptional<Keys>;

  type ThemeDataOptions<R extends ValidRoute = ValidRoute> = {
    pathInfo?: OptValue | OptPick<readonly (keyof ThemePathInfo<PathMap[R]>)[]>;
    batches?: OptValue | OptPick<string[]>;
    info?: OptValue | OptPick<readonly (keyof ThemeInfo<Theme>)[]>;
    images?: OptValue | OptPick<readonly (keyof ResizedImages)[]>;
    weekTrailers?: OptValue;
    adjacent?:
      | OptValue
      | {
          pathInfo?: OptPick<readonly (keyof ThemePathInfo<PathMap[R]>)[]>;
          images?: OptPick<readonly (keyof ResizedImages)[]>;
        };
    clickable?: OptValue;
    level?: OptValue | OptPick<readonly (keyof WithAdjacent<ThemeLevel>)[]>;
    batch?: OptValue | OptPick<readonly (keyof WithAdjacent<ThemeBatch>)[]>;
    type?: OptValue;
    small?: OptValue;
    heading?: OptValue;
    subHeading?: OptValue;
  };

  type IsUnion<T> = [T] extends [infer U]
    ? T extends U
      ? Exclude<T, U> extends never
        ? false // Single theme
        : true // Union of themes
      : never
    : never;

  type ThemeDataMapping<
    P extends ValidPath,
    PI extends Pick<ThemePathInfo<P>, "theme" | "params">
  > = {
    pathInfo: PI;
    images: Images[PI["theme"]]["images"];
    batches: ThemeBatch[];
    info: ThemeInfo<PI["theme"]>;
    weekTrailers: string[];
    type?: "special" | "simple" | "normal";
    small?: boolean;
    adjacent: IsUnion<PI["theme"]> extends true
      ? InferAdjacent<PI["theme"], ThemeKeys> extends {
          next: { exists: infer A; value: infer V };
          prev: { exists: infer B; value: infer W };
        }
        ? {
            next: A extends true
              ? {
                  exists: true;
                  value: V extends Theme
                    ? {
                        pathInfo: ThemePathInfo<`/${V}`>;
                        images: Images[V]["images"];
                      }
                    : never;
                }
              : { exists: false };
            prev: B extends true
              ? {
                  exists: true;
                  value: W extends Theme
                    ? {
                        pathInfo: ThemePathInfo<`/${W}`>;
                        images: Images[W]["images"];
                      }
                    : never;
                }
              : { exists: false };
          }
        : never
      : Adjacent<
          {
            pathInfo: ThemePathInfo<ValidPath>;
            images: ResizedImages;
          }[]
        >;
    batch: "batchNumber" extends keyof PI["params"]
      ? PI["params"]["batchNumber"] extends string
        ? WithAdjacent<ThemeBatch>
        : never
      : never;
    level: "batchNumber" extends keyof PI["params"]
      ? PI["params"]["batchNumber"] extends string
        ? "order" extends keyof PI["params"]
          ? PI["params"]["order"] extends string
            ? WithAdjacent<ThemeLevel>
            : never
          : never
        : never
      : never;
    clickable: React.ElementType | "button" | "a";
    heading: string;
    subHeading: string;
  };

  type MakeOptionalOptional<T extends Record<string, unknown>> = {
    [K in keyof T]: T[K] | undefined;
  };

  type ThemeData<
    P extends ValidPath,
    Opt extends ThemeDataOptions,
    PI extends ThemePathInfo<P> = ThemePathInfo<P>
  > = {
    [K in keyof ThemeDataMapping<P, PI> as WithOption<
      Opt[K extends keyof Opt ? K : never],
      ThemeDataMapping<P, PI>[K]
    > extends never
      ? never
      : K extends keyof ThemeDataMapping<P, PI>
      ? K
      : never]: WithOption<
      Opt[K extends keyof Opt ? K : never],
      ThemeDataMapping<P, PI>[K]
    >;
  };
}
// prettier-ignore
export { };

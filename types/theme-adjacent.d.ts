declare global {
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

  /**
   * A little overkill, but it's a way to infer the adjacent theme data for a given path, while not
   * trying to when we didn't get a union of a theme. It's overkill since we do not have instances
   * where this happens aside from the tests.
   */
  type WithAdjacentTheme<PI extends Pick<ThemePathInfo<ValidPath>, "theme">> =
    IsUnion<PI["theme"]> extends true
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

  type WithAdjacentBatch<PI extends Pick<ThemePathInfo<ValidPath>, "params">> =
    "batchNumber" extends keyof PI["params"]
      ? PI["params"]["batchNumber"] extends string
        ? WithAdjacent<ThemeBatch>
        : never
      : never;

  type WithAdjacentLevel<PI extends Pick<ThemePathInfo<ValidPath>, "params">> =
    "batchNumber" extends keyof PI["params"]
      ? PI["params"]["batchNumber"] extends string
        ? "order" extends keyof PI["params"]
          ? PI["params"]["order"] extends string
            ? WithAdjacent<ThemeLevel>
            : never
          : never
        : never
      : never;
}

export {};

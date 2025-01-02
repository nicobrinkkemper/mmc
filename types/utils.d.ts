declare global {
  type Primitive = string | number | boolean | null | undefined;

  /**
   * IF you've used a predicate function, this type will infer the type of the value it is checking for
   * @example
   * type Result = GuardType<typeof isString> // string
   */
  type GuardType<T extends (x: any) => x is any> = T extends (
    x: any
  ) => x is infer X
    ? X
    : never;

  /**
   * Replace the params in a string with the values in the map
   * @example
   * type Result = TypeReplace<"/:theme/levels/:batchNumber/:order", { theme: "abc", batchNumber: "123", order: "456" }>
   * // "abc/levels/123/456"
   */
  type TypeReplace<
    S extends string,
    M extends Record<string, any>,
    DELIMITER extends string = ":",
    SEPARATOR extends string = "/"
  > = S extends `${infer Pre}${DELIMITER}${infer Param}${SEPARATOR}${infer Rest}`
    ? Param extends keyof M
      ? `${Pre}${M[Param]}${SEPARATOR}${TypeReplace<
          Rest,
          M,
          DELIMITER,
          SEPARATOR
        >}`
      : `${Pre}${DELIMITER}${Param}${SEPARATOR}${TypeReplace<
          Rest,
          M,
          DELIMITER,
          SEPARATOR
        >}`
    : S extends `${infer Pre}${DELIMITER}${infer Param}`
    ? Param extends keyof M
      ? `${Pre}${M[Param]}`
      : `${Pre}${DELIMITER}${Param}`
    : S;

  /**
   * Get all the keys of an intersection of object types
   */
  type KeysOfIntersection<T> = T extends T ? keyof T : never;
  /**
   * Return the next value in the union (expressed as a tuple)
   * @example
   * type Result = NextInUnion<"4ymm", ThemeKeys>; // "5ymm"
   * type Abc = NextInUnion<"a", UnionToTuple<"a" | "b">>;
   */
  type NextInUnion<T, Order extends Primitive[]> = Extract<
    Order[IndexOf<Order, T> extends -1
      ? 0
      : IndexOf<Order, T> extends infer I extends number
      ? Add1<I> extends keyof Order
        ? Add1<I>
        : 0
      : never],
    Order[number]
  >;

  /**
   * Returns the previous value in the union (expressed as a tuple)
   * @example
   * type Result = PrevInUnion<"5ymm", ThemeKeys>; // "4ymm"
   * type Abc = PrevInUnion<"b", UnionToTuple<"a" | "b">>;
   */
  type PrevInUnion<T, Order extends Primitive[]> = Extract<
    Order[IndexOf<Order, T> extends -1
      ? 0
      : IndexOf<Order, T> extends infer I extends number
      ? I extends 0
        ? Order["length"] extends number
          ? Subtract1<Order["length"]>
          : never
        : Subtract1<I>
      : never],
    Order[number]
  >;

  /**
   * Converts a union type to an intersection type
   * @example
   * type Union = { a: string } | { b: number }
   * type Result = UnionToIntersection<Union> // { a: string } & { b: number }
   */
  type UnionToIntersection<U> = (
    U extends any ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;

  /**
   * Converts a union type to a tuple type
   * @example
   * type Result = UnionToTuple<"4ymm" | "5ymm" | "6ymm"> // ["4ymm", "5ymm", "6ymm"]
   */
  type UnionToTuple<U> = UnionToIntersection<
    U extends any ? (x: () => U) => void : never
  > extends (x: () => infer R) => void
    ? [...UnionToTuple<Exclude<U, R>>, R]
    : [];

  /**
   * Checks if a type is a union
   * @example
   * type Result = IsUnion<"4ymm" | "5ymm" | "6ymm"> // true
   * type Result2 = IsUnion<"4ymm"> // false
   */
  type IsUnion<T> = [T] extends [infer U]
    ? T extends U
      ? Exclude<T, U> extends never
        ? false // Single theme
        : true // Union of themes
      : never
    : never;

  /**
   * Infers return types from a record of mapper functions
   * @example
   * type Mappers = {
   *   name: (val: string) => string;
   *   age: (val: string) => number;
   * }
   * type Result = InferMapperTypes<Mappers> // { name: string; age: number }
   */
  type InferMapperTypes<M extends Record<string, (val: string) => any>> = {
    [K in keyof M]: ReturnType<M[K]>;
  };

  /**
   * Creates a mapper function from a configuration object
   */
  type CreateMapperFn = <
    M extends Record<string, (val: string) => any>,
    R
  >(config: {
    mappers: { [K in keyof M]: M[K] };
    transform: (rows: InferMapperTypes<M>, index: number) => R;
  }) => (rows: Record<string, string>) => R;

  /**
   * Recursively replaces $index keys with arrays in object types
   * @example
   * type Input = { $index: { name: string } }
   * type Result = ReplaceIndex<Input> // { name: string }[]
   */
  type ReplaceIndex<T> = T extends Array<infer U>
    ? Array<ReplaceIndex<U>>
    : T extends { $index: any }
    ? ReplaceIndex<T["$index"]>[]
    : T extends object
    ? { [P in keyof T]: ReplaceIndex<T[P]> }
    : T;

  /**
   * Extracts a value type from a nested path string
   * @example
   * type Result = ExtractPathValue<string, "user.addresses.$index.street">
   * // { user: { addresses: { street: string }[] } }
   */
  type ExtractPathValue<
    R,
    P extends string
  > = P extends `${infer Key}.${infer Rest}`
    ? Rest extends `$index.${infer More}`
      ? { [K in Key]: { [K2 in More]: R }[] }
      : { [K in Key]: ExtractPathValue<R, Rest> }
    : { [K in P]: R };

  /**
   * Merges intersected object types while preserving array structures
   * @example
   * type Input = { a: { b: number } } & { a: { c: string } }
   * type Result = MergePaths<Input> // { a: { b: number; c: string } }
   */
  type MergePaths<T> = {
    [K in keyof UnionToIntersection<T>]: UnionToIntersection<T>[K] extends Array<any>
      ? UnionToIntersection<T>[K]
      : UnionToIntersection<T>[K] extends object
      ? MergePaths<UnionToIntersection<T>[K]>
      : UnionToIntersection<T>[K];
  };

  /**
   * Extracts and merges types from a collection of path-based transformers
   * @example
   * type Config = {
   *   name: { path: "user.name"; transform: (v: string) => string };
   *   age: { path: "user.age"; transform: (v: string) => number };
   *   addresses: { path: "user.addresses.$index.street"; transform: (v: string) => string };
   * }
   * type Result = ExtractPathTypes<Config>
   * // {
   * //   user: {
   * //     name: string;
   * //     age: number;
   * //     addresses: { street: string }[];
   * //   }
   * // }
   */
  type ExtractPathTypes<T> = MergePaths<
    UnionToIntersection<
      {
        [K in keyof T]: T[K] extends {
          path: infer P;
          transform: (v: string) => infer R;
        }
          ? P extends string
            ? ExtractPathValue<R, P>
            : never
          : never;
      }[keyof T]
    >
  >;

  /**
   * Gets index of type T in tuple Tuple
   */
  type IndexOf<Tuple extends any[], T> = Tuple extends [
    ...infer Before,
    infer Current
  ]
    ? T extends Current
      ? Before["length"]
      : IndexOf<Before, T>
    : -1;

  /**
   * Index of record key in a tuple of records
   * @example
   * type Result = IndexOfKey<[{ a: 1 }, { b: 2 }, { c: 3 }], "b">;
   * // 1
   */
  type IndexOfKey<
    Tuple extends readonly Record<PropertyKey, any>[],
    T extends PropertyKey
  > = Tuple extends readonly [
    ...infer Before extends readonly Record<PropertyKey, any>[],
    infer Current extends Record<PropertyKey, any>
  ]
    ? T extends keyof Current
      ? Before["length"]
      : IndexOfKey<Before, T>
    : -1;

  /**
   * Adds 1 to a number type
   */
  type Add1<N extends number> = [...TupleOf<N>, any]["length"];

  /** Helper: Subtracts 1 from a number type */
  type Subtract1<N extends number> = TupleOf<N> extends [...infer Init, any]
    ? Init["length"]
    : never;

  /**
   * Creates tuple of length N
   */
  type TupleOf<N extends number, T extends any[] = []> = T["length"] extends N
    ? T
    : TupleOf<N, [...T, any]>;

  /**
   * Gets the index of an item in a tuple
   */
  type TupleIndex<T extends any[], Item> = {
    [K in keyof T]: T[K] extends Item ? K : never;
  }[number];

  type Split<S extends string, D extends string = "/"> = string extends S
    ? string[]
    : S extends ""
    ? []
    : S extends `${infer T}${D}${infer U}`
    ? [T, ...Split<U, D>]
    : [S];
}

export {};


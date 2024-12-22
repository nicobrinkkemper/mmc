declare global {
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
}

export {};

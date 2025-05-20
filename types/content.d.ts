import * as contents from "../src/copy/index.ts";

declare global {
  type Contents = typeof contents;
  type ContentKey = keyof Contents["_default"];
  type ContentComponent<Key extends ContentKey = ContentKey> =
    Contents["_default"][Key];

  type ContentComponentProps<
    R extends ValidRoute,
    Key extends ContentKey = ContentKey
  > = React.ComponentProps<Contents["_default"][Key]> & {
    pathInfo: ThemePathInfo<R> & { theme: string };
  };

  type ContentAtFn = <
    R extends ValidRoute,
    Key extends ContentKey,
    Props extends ContentComponentProps<R, Key>
  >(
    props: Readonly<{ at: Key; pathInfo: ThemePathInfo<R> } & Props>
  ) => React.ReactNode;

}


export {};


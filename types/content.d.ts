import * as contents from "../src/copy/index.ts";

declare global {
  type Contents = typeof contents;
  type ContentKey = keyof Contents["_default"];
  type ContentComponent<Key extends ContentKey = ContentKey> =
    Contents["_default"][Key];

  type ContentComponentProps<
    P extends ValidPath,
    Key extends ContentKey = ContentKey
  > = React.ComponentProps<Contents["_default"][Key]> & {
    pathInfo: ThemePathInfo<P> & { theme: string };
  };

  type ContentAtFn = <
    P extends ValidPath,
    Key extends ContentKey,
    Props extends ContentComponentProps<P, Key>
  >(
    props: Readonly<{ at: Key; pathInfo: ThemePathInfo<P> } & Props>
  ) => React.ReactNode;

}


export {};


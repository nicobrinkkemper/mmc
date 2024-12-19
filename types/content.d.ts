import * as contents from "../src/copy/index.ts";

declare global {
  type Contents = typeof contents;
  type ContentKey = keyof Contents["_default"];
  type ContentComponent<Key extends ContentKey = ContentKey> =
    Contents["_default"][Key];
  type ContentComponentProps<Key extends ContentKey = ContentKey> =
    React.ComponentProps<Contents["_default"][Key]>;

  /**
   * A Content component is usually just a card, but it can be anything that
   * each theme can have. This is a wrapper that includes the theme as a prop for
   * each of those components automatically
   */
  type ContentComponentWithTheme<Key extends ContentKey = ContentKey> = (
    props: Parameters<Contents["_default"][Key]>[0] & { theme: Theme }
  ) => ReturnType<Contents["_default"][Key]>;

  type ContentComponentWithThemeProps<Key extends ContentKey = ContentKey> =
    React.ComponentProps<Contents["_default"][Key]> & { theme: Theme };

  export type MarioTurnsXthStaticProps = {
    pathInfo: ThemePathInfo;
    info: ThemeInfo;
    images: ThemeImages;
  } & Clickable;
}

export {};

import * as contents from "./index";

export type Contents = typeof contents;
export type ContentKey = keyof Contents["_default"];
export type ContentComponent<Key extends ContentKey> =
  Contents["_default"][Key];
const contentsKeys = Object.keys(contents["_default"]) as ContentKey[];

export { contents, contentsKeys };

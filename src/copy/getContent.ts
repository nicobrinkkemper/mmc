import { contents } from "./contents.js";

export function getContent<T extends Theme, K extends ContentKey>(
  theme: T,
  key: K
): ContentComponent<K> {
  const content = contents[`_${theme}`];
  if (key in content) return content[key as never];
  return contents._default[key];
}

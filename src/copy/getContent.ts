import { contents } from "./contents.js";

export function getContent<T extends Theme, K extends ContentKey>(
  theme: T,
  key: K
): ContentComponent<K> {
  if (!theme) {
    throw new Error("Theme is required for a Content component");
  }
  const content = contents[`_${theme}`];
  if (!content) {
    throw new Error(
      `No content found for theme ${theme}, available: ${Object.keys(
        contents
      ).join(", ")}`
    );
  }
  if (key in content) return content[key as never];
  return contents._default[key];
}

import { mainTheme } from "../config/themeConfig.js";
import { contents } from "./contents.js";

export function getContent<T extends Theme, K extends ContentKey>(
  theme: T,
  key: K
): ContentComponent<K> {
  if (!theme) {
    console.warn("Theme is required for a Content component");
    theme = mainTheme as T;
  }
  let content = contents[`_${theme}`];
  if (!content) {
    console.warn(
      `No content found for theme ${theme}, available: ${Object.keys(
        contents
      ).join(", ")}`
    );
    return ({ children = null }: any) => children;
  }
  if (key in content) return content[key as never];
  return contents._default[key];
}

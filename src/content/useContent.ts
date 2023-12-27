import { useTheme } from "../theme/useTheme";
import * as contents from "./";

type ContentKey = keyof typeof contents._default;
type Return<Key extends ContentKey> = (typeof contents._default)[Key];

export function useContent<Key extends ContentKey>(key: Key): Return<Key> {
  const content = contents[`_${useTheme().theme}`];
  if (key in content) return content[key as never];
  return contents._default[key];
}

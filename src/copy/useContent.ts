import { useMemo } from "react";
import { useTheme } from "../theme/useTheme";
import type { ContentComponent, ContentKey } from "./contents";
import { contents } from "./contents";

export function useContent<Key extends ContentKey>(
  key: Key
): ContentComponent<Key> {
  const theme = useTheme().theme;
  return useMemo(() => {
    const content = contents[`_${theme}` as never];
    if (key in content) return content[key as never];
    return contents._default[key];
  }, [theme, key]);
}

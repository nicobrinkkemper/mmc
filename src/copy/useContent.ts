import { useMemo } from "react";
import { useTheme } from "../hooks/useTheme.js";
import { getContent } from "./getContent.js";

export function useContent<Key extends ContentKey>(
  key: Key
): ContentComponent<Key> {
  const theme = useTheme();
  if (!theme || !theme.pathInfo || !("theme" in theme.pathInfo)) {
    throw new Error("Theme not found");
  }
  const t = theme.pathInfo.theme;
  return useMemo(() => {
    return getContent(t, key);
  }, [t, key]);
}

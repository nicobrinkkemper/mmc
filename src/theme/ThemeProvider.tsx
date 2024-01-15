import { PropsWithChildren, useMemo, useRef } from "react";
import { ThemeContext, getThemeInfo, getThemePathInfo } from "./ThemeContext";
import { useLocation } from "react-router-dom";
import { Theme } from "../data/types";
import { useThemeData } from "../data/useThemeData";

export function ThemeProvider({
  children,
  theme,
}: Readonly<PropsWithChildren<{ theme: Theme }>>) {
  const { pathname } = useLocation();
  const { themes } = useThemeData();
  const themesRef = useRef(themes);

  const context = useMemo(
    () => ({
      theme: theme,
      themeSlug: theme + "/",
      startDate: new Date(themesRef.current[theme].batches[0].releaseDate.date),
      data: themesRef.current[theme],
      info: { ...getThemePathInfo(theme, pathname), ...getThemeInfo(theme) },
    }),
    [theme, pathname]
  );

  return (
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  );
}

import { type PropsWithChildren, useRef, use, useMemo } from "react";
import { getThemeJson } from "./getThemeJson";
import {
  ThemeDataContext,
  type ThemeDataContextType,
} from "./ThemeDataContext";

export function ThemeDataProvider({ children }: Readonly<PropsWithChildren>) {
  const data = useRef(getThemeJson());

  const contextValue = useMemo((): ThemeDataContextType => {
    if (!data.current) throw new Error("No data.current");
    const { themes, themeKeys, themesTotal } = data.current;
    return {
      themes,
      themeKeys,
      themesTotal,
    };
  }, []);

  return (
    <ThemeDataContext.Provider value={contextValue}>
      {children}
    </ThemeDataContext.Provider>
  );
}

export default ThemeDataProvider;

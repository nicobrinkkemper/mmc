"use client";
import { createContext, useContext } from "react";
import { mainTheme } from "../config/themeConfig.js";

export const SelectedThemeContext = createContext<Theme>(mainTheme);

/**
 * Don't use this hook inside nested components, to support full static rendering.
 * remember to use the "use client" if you do end up something client-side specific.
 *
 * Since this App never really had anything clientside spefific other than clickable links, that's the
 * only thing now supported.
 *
 * These directives are React Server Component specific - just like next.js uses them.
 */
export function useSelectedTheme() {
  const theme = useContext(SelectedThemeContext);
  if (!theme) {
    throw new Error(
      "useSelectedTheme must be used within a SelectedThemeContext.Provider"
    );
  }
  return theme;
}
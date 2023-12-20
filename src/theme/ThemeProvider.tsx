import { PropsWithChildren, useState, useMemo, useCallback } from 'react';
import { Theme, ThemeContext, createThemeContext, nextTheme, prevTheme, themeKeys } from './ThemeContext';
import { useLocation } from 'react-router-dom';

const defaultTheme = '8mmc';
const hasValidParam = (themeParam: string): themeParam is Theme => themeKeys.includes(themeParam as Theme)
export function ThemeProvider({ children, theme: themeParam }: Readonly<PropsWithChildren<{ theme: string }>>) {
    const defaultThemeFromParam = hasValidParam(themeParam) ? themeParam : defaultTheme

    const [theme, setTheme] = useState<Theme>(defaultThemeFromParam);
    const pathname = useLocation().pathname;

    const themeUp = useCallback(() => {
        setTheme(nextTheme(theme));
    }, [theme, setTheme]);
    const themeDown = useCallback(() => {
        setTheme(prevTheme(theme));
    }, [theme, setTheme]);

    if (hasValidParam(themeParam)) {
        if (themeParam !== theme) setTheme(themeParam);
    } else if (theme !== defaultThemeFromParam) {
        setTheme(defaultThemeFromParam);
    }

    if (!themeKeys.includes(theme)) console.error('Invalid theme', theme);

    const contextValue = useMemo(() => createThemeContext({
        theme,
        setTheme,
        themeUp,
        themeDown,
        themeSlug: `${theme}/`,
    }, pathname), [
        pathname,
        theme,
        themeDown,
        themeUp
    ]);
    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
}
import { PropsWithChildren, useState, useMemo, useCallback, useEffect } from 'react';
import { Theme, ThemeContext, createThemeContext, nextTheme, prevTheme, themeKeys } from './ThemeContext';

const defaultTheme = '8mmc';
const hasValidParam = (themeParam: string): themeParam is Theme => themeKeys.includes(themeParam as Theme)
export function ThemeProvider({ children, theme: themeParam }: Readonly<PropsWithChildren<{ theme: string }>>) {
    const defaultThemeFromParam = hasValidParam(themeParam) ? themeParam : defaultTheme
    const [theme, setTheme] = useState<Theme>(defaultThemeFromParam);
    const themeUp = useCallback(() => {
        setTheme(nextTheme(theme));
    }, [theme, setTheme]);
    const themeDown = useCallback(() => {
        setTheme(prevTheme(theme));
    }, [theme, setTheme]);
    useEffect(() => {
        if (hasValidParam(themeParam) && themeParam !== theme) {
            setTheme(themeParam);
        } else if (theme !== defaultThemeFromParam) {
            setTheme(defaultThemeFromParam);
        }
    }, [theme, themeParam, defaultThemeFromParam]);
    if (theme !== '8mmc' && theme !== '7mmc') console.error('Invalid theme', theme);
    const contextValue = useMemo(() => createThemeContext({
        theme,
        setTheme,
        themeUp,
        themeDown,
        themeSlug: `${theme}/`,
    }), [
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
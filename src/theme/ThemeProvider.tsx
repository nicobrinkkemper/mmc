import { PropsWithChildren, useState, useMemo, } from 'react';
import { Theme, ThemeContext, createThemeContext, themeKeys } from './ThemeContext';
import { useLocation } from 'react-router-dom';

const defaultTheme = '8mmc';
const hasValidParam = (themeParam: string): themeParam is Theme => themeKeys.includes(themeParam as Theme)
export function ThemeProvider({ children, theme: themeParam }: Readonly<PropsWithChildren<{ theme: string }>>) {
    const validTheme = hasValidParam(themeParam);
    const defaultThemeFromParam = validTheme ? themeParam : defaultTheme

    const [theme, setTheme] = useState<Theme>(defaultThemeFromParam);
    const pathname = useLocation().pathname;

    if (validTheme) {
        if (themeParam !== theme) setTheme(themeParam);
    } else if (theme !== defaultThemeFromParam) {
        setTheme(defaultThemeFromParam);
    }

    const contextValue = useMemo(() => createThemeContext({
        theme,
        setTheme,
        themeSlug: `${theme}/`,
    }, pathname), [
        pathname,
        theme,
    ]);

    if (!hasValidParam(theme)) console.error('Invalid theme', theme);
    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
}
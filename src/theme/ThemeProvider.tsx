import { PropsWithChildren, useState, useMemo, useCallback, useEffect } from 'react';
import { Theme, ThemeContext, createThemeContext, nextTheme, prevTheme, themeKeys } from './ThemeContext';
import { useLocation } from 'react-router-dom';

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
    const { pathname } = useLocation();
    const contextValue = useMemo(() => createThemeContext({
        theme,
        setTheme,
        themeUp,
        themeDown,
        locationWithoutTheme: pathname.replace(theme + '/', ''),
        themeSlug: `/${theme}/`,
    }), [
        pathname,
        theme,
        themeDown,
        themeUp
    ]);
    return (
        <ThemeContext.Provider value={contextValue}>
            <div className={contextValue.classes?.Theme}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}
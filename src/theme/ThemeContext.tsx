import { createContext } from 'react';
import { convertNumberToWord } from './convertNumberToWord';
import { capitalize, snakeCase } from 'lodash';
import themes from "../data/themes.json";


export const themeKeys = Object.keys(themes) as (keyof typeof themes)[];
export const themesTotal = themeKeys.length
export type Theme = typeof themeKeys[number];

export type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    themeUp: () => void;
    themeDown: () => void;
    info: ThemeInfo
    themeSlug: string;
    data: typeof themes[Theme];
}


const getThemeInfo = (theme: Theme) => {
    const caps = theme.toUpperCase();
    const snake = snakeCase(theme);
    const ordinalString = snake.split('_')[0];
    const ordinal = Number(ordinalString);
    const themeYear = convertNumberToWord(ordinal, 'english');
    const writtenOutOrdinal = convertNumberToWord(ordinal, 'englishOrdinal');
    const writtenOut = capitalize(writtenOutOrdinal) + ' Mario Maker Celebration';
    return {
        caps,
        snake,
        ordinal,
        themeYear,
        writtenOutOrdinal,
        writtenOut,
        mainTheme: '8mmc',
        nextTheme: nextTheme(theme),
        prevTheme: prevTheme(theme),
    }
}
type ThemeInfo = ReturnType<typeof getThemeInfo>;

export const createThemeContext = (context: Omit<ThemeContextType, 'info' | 'data'>): ThemeContextType => {
    return ({
        ...context,
        data: themes[context.theme],
        info: getThemeInfo(context.theme)
    })
};

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const nextTheme = (current: Theme) => {
    const currentIndex = themeKeys.indexOf(current);
    if (currentIndex === themesTotal - 1) return themeKeys[0];
    return themeKeys[currentIndex + 1];
}
export const prevTheme = (current: Theme) => {
    const currentIndex = themeKeys.indexOf(current);
    if (currentIndex === 0) return themeKeys[themesTotal - 1];
    return themeKeys[currentIndex - 1];
}

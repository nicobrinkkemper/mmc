import { createContext } from 'react';
import { convertNumberToWord } from './convertNumberToWord';
import { capitalize, snakeCase } from 'lodash';


export const themeKeys = ['7mmc', '8mmc'] as const;
export const themesTotal = 2
export type Theme = typeof themeKeys[number];
export type _Theme = `_${Theme}`;

export type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    themeUp: () => void;
    themeDown: () => void;
    info: ThemeInfo
    themeSlug: string;
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

export const createThemeContext = (context: Omit<ThemeContextType, 'Credits' | 'info'>): ThemeContextType => {
    return ({
        ...context,
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

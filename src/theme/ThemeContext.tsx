import { createContext } from 'react';
import base from "./base.module.css";
import mmc7 from "./7mmc.module.css";
import mmc8 from "./8mmc.module.css";
import Credits from "./Credits.module.css";
import { convertNumberToWord } from './convertNumberToWord';
import { capitalize, snakeCase } from 'lodash';

export const themesCss = {
    '7mmc': { ...base, ...mmc7 },
    '8mmc': { ...base, ...mmc8 },
} satisfies {
        // this ensures themes have the same keys
        [key in '7mmc' | '8mmc']: typeof mmc7 & typeof mmc8 & typeof base
    };

export const themeKeys = Object.keys(themesCss) as Theme[];
export const themesTotal = themeKeys.length

export type ThemeCSS = typeof themesCss
export type Theme = keyof ThemeCSS;

export type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    classes: ThemeCSS[Theme];
    Credits: typeof Credits;
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
    const themeYear = convertNumberToWord(ordinal, 'english').toLowerCase();
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

export const createThemeContext = (context: Omit<ThemeContextType, 'classes' | 'Credits' | 'info'>): ThemeContextType => {

    return ({
        ...context,
        classes: themesCss[context.theme],
        Credits,
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

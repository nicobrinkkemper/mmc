import { capitalize } from "lodash-es";
import { convertNumberToWord } from "./convertNumberToWord.js";
import { safeSnakecase } from "./safeSnakecase.mjs";
export const getThemeInfo = (theme) => {
    if (!theme) {
        throw new Error("No theme defined");
    }
    const caps = theme.toUpperCase();
    const slug = theme;
    const snake = safeSnakecase(theme);
    const ordinalString = snake.split("_")[0];
    const ordinal = Number(ordinalString);
    const themeYear = convertNumberToWord(ordinal, "english");
    const writtenOutOrdinal = convertNumberToWord(ordinal, "englishOrdinal");
    const writtenOut = theme.endsWith("ymm")
        ? capitalize(themeYear) + " Years of Mario Maker"
        : capitalize(writtenOutOrdinal) + " Mario Maker Celebration";
    return {
        slug,
        caps,
        snake,
        ordinal,
        themeYear,
        writtenOutOrdinal,
        writtenOut,
    };
};
//# sourceMappingURL=getThemeInfo.js.map
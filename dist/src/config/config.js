import { themeConfig } from "./constants.js";
export const themeKeys = Object.keys(themeConfig);
export const themeKeysNoPrefix = themeKeys.map((key) => key.replace("_", ""));
/**
 * The final configuration object that will be used for the codebase.
 */
export const config = Object.entries(themeConfig).map(([key, v]) => {
    const theme = key.replace("_", "");
    return Object.assign(v, {
        key: key,
        theme: theme,
        info: {
            gid: v.gid,
        },
    });
});
//# sourceMappingURL=config.js.map
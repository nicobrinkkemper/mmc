export declare const themeKeys: [ThemeConfigKey];
export declare const themeKeysNoPrefix: ThemeConfigTheme[];
export type ThemeConfigRecord = {
    [K in keyof ThemeConfigValue[ThemeConfigKey]]: ThemeConfigValue[ThemeConfigKey][K];
};
/**
 * The final configuration object that will be used for the codebase.
 */
export declare const config: (ThemeConfigRecord & {
    key: ThemeConfigKey;
    theme: "9mmc" | "4ymm" | "5ymm" | "6ymm" | "7mmc" | "8mmc";
    info: {
        gid: number;
    };
})[];
//# sourceMappingURL=config.d.ts.map
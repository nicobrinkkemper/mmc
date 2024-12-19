export declare const createThemeDataGetter: <K extends keyof ThemeDataOptions>(key: K, errorMessage: string) => (opts: ThemeDataOptions, staticData: Record<string, any>) => { [P in K]?: any; } | {
    error: string;
} | null;
//# sourceMappingURL=createThemeDataGetter.d.ts.map
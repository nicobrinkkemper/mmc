import * as themesCss from "./index";

export type ThemeCssModule = typeof themesCss;
export type ThemeCssModuleKey = keyof ThemeCssModule;
export const themeCssModuleKeys = Object.keys(themesCss) as ThemeCssModuleKey[];
export type ThemeCssClassName = keyof ThemeCssModule[ThemeCssModuleKey];

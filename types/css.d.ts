declare global {
  type ThemeCssModule = typeof import("../src/css/index.ts");
  type ThemeCssModuleKey = keyof ThemeCssModule;
  type ThemeCssClassName = keyof ThemeCssModule[ThemeCssModuleKey];
}
export {};

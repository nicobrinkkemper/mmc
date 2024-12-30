declare global {
  type PageMap = typeof import("../src/page/pages.js").pages;
  type AnyPage = PageMap[keyof PageMap];
}

export {};

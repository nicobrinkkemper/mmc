import { pages } from "../src/page/pages.js";

declare global {
  type PageMap = typeof pages;
  type AnyPage = PageMap[keyof PageMap];
}

export {};

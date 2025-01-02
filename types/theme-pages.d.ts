import { pages } from "../src/page/pages.tsx";

declare global {
  type PageMap = typeof pages;
  type AnyPage = PageMap[keyof PageMap];
}

export { };


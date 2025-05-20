import { pages } from "../src/page/pages.tsx";

declare global {
  type PageMap = {
    [K in keyof typeof pages]: {
      [L in keyof (typeof pages)[K]]: (typeof pages)[K][L];
    };
  };
  type AnyPage = PageMap[keyof PageMap];

  type PropsMap = {
    [K in keyof PageMap]: Awaited<ReturnType<PageMap[K]["props"]>>;
  };

  type HomePageProps = PropsMap["/"];
  type ThemePageProps = PropsMap["/:theme"];
  type CreditsPageProps = PropsMap["/:theme/credits"];
  type LevelsPageProps = PropsMap["/:theme/levels"];
  type BatchPageProps = PropsMap["/:theme/levels/:batchNumber"];
  type LevelPageProps = PropsMap["/:theme/levels/:batchNumber/:order"];

  // some sanity checks
  type HomePageImages = HomePageProps["images"];
  type ThemePageImages = ThemePageProps["images"];
  type CreditsPageImages = CreditsPageProps["images"];
  type LevelsPageImages = LevelsPageProps["images"];
  type BatchPageImages = BatchPageProps["images"];
  type LevelPageImages = LevelPageProps["images"];
  // favicons
  type HomePageFavicon = HomePageImages["logo"];
  
}

export { };


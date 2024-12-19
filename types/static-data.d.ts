declare global {
  type ThemeStaticData =
    import("../src/data/getStaticData.ts").GetStaticDataReturn;
}

export {};

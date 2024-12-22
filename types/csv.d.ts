// before we define the config, we take the change to define the types we want from the csv and reuse elsewhere throughout the codebase
declare global {
  // from a intersection of object types, get all the keys
  type KeysOfIntersection<T> = T extends T ? keyof T : never;

  type Constants = typeof import("../src/config/themeConfig.ts");
  type MainTheme = Constants["mainTheme"];
  type ThemeCsv = {
    order: string;
    batchNumber: string;
    levelName: string;
    makerName: string;
    discordName: string;
    makerId: string;
    briefDescription: string;
    progress: string;
    difficultyName: string;
    gameStyle: string;
    genre: string;
    isMusicLevel: string;
    mainTheme: string;
    subTheme: string;
    clearCondition: string;
    averageClearTime: string;
    description: string;
    makerDescription: string;
    difficulty: number;
    tags: string[];
    nationality: string;
    levelCode: string;
    releaseDate: string;
  };

  interface ThemeCsvParseResult<T> {
    data: T[];
    errors: ThemeCsvParseError[];
    meta: ThemeCsvParseMeta;
  }

  type ThemeCsvLevelParseResult = ThemeCsvParseResult<
    Omit<ThemeCsv, "levelName" | "makerName" | "tags"> & {
      levelName: { slug: string; name: string };
      makerName: { slug: string; name: string };
      tags: string[];
      image: string;
    }
  >;

  // helpers
  type ThemeCsvLevel = ThemeCsvLevelParseResult["data"][number];

  type ThemeCsvHeaders = keyof ThemeCsv;
  interface ThemeCsvParseMeta {
    delimiter: string;
    linebreak: string;
    aborted: boolean;
    fields?: string[] | undefined;
    truncated: boolean;
    cursor: number;
  }
  interface ThemeCsvParseError {
    type: "Quotes" | "Delimiter" | "FieldMismatch";
    code:
      | "MissingQuotes"
      | "UndetectableDelimiter"
      | "TooFewFields"
      | "TooManyFields"
      | "InvalidQuotes";
    message: string;
    row?: number | undefined;
    index?: number | undefined;
  }

  type CsvReviver<H = string, V = any> = (
    value: string | number | boolean,
    header?: H,
    row?: number,
    col?: number
  ) => V;

  type CsvParseResult<
    Skip extends boolean,
    H = string,
    V = any
  > = Skip extends true ? V[][] : [H[], ...V[][]];
}
export {};


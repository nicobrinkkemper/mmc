// before we define the config, we take the change to define the types we want from the csv and reuse elsewhere throughout the codebase
declare global {
  // from a intersection of object types, get all the keys
  type KeysOfIntersection<T> = T extends T ? keyof T : never;

  type Constants = typeof import("../src/config/constants.ts");
  type MainTheme = Constants["mainTheme"];
  type ThemeCsv = {
    order: number;
    batchNumber: number;
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
    difficulty: string;
    tags: string;
    nationality: string;
    levelCode: string;
    releaseDate: string;
  };
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

  type ThemeCsvLevel = ThemeCsvLevelParseResult["data"][number];
}
export {};

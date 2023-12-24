import type { ImageJsonStructure } from "../resize/resizeJobGroupToData.mts";
import type { Theme } from "./themes.mts";

export type ThemeCsv = {
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

export type ThemeCsvParseResult = Papa.ParseResult<
  Omit<PreParseResult, "levelName" | "makerName" | "releaseDate" | "tags"> & {
    levelName: { slug: string; name: string };
    makerName: { slug: string; name: string };
    releaseDate: { date: string };
    tags: string[];
    image: string;
  }
>;

export type ThemeCsvParseResultData = ThemeCsvParseResult["data"][number];

export type Images = Record<
  Theme,
  Record<"level" | "maker" | "images", ImageJsonStructure>
>;

export type CsvHeaders = keyof PreParseResult;

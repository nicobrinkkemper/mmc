declare global {
  type ThemeLevel = ThemeLevelData;

  type ThemeBatch = {
    batchNumber: string;
    batchName: string;
    batchDescription: string;
    weekTrailer: string;
    levels: ThemeLevel[];
    image: ResizedBatchImage | null;
    releaseDate: {
      value: string;
      date: Date;
      isUnreleased: boolean;
    };
  };

  type ThemeInfo<T extends Theme = Theme> = {
    readonly slug: string;
    readonly caps: Uppercase<T>;
    readonly snake: string;
    readonly ordinal: number;
    readonly themeYear: T extends `${infer First}${string}` ? First : never;
    readonly writtenOutOrdinal: string;
    readonly writtenOut: string;
  };
}

export {};

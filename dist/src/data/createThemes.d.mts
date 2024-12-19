type SpreadsheetDataType = Record<Theme, Record<string, unknown>>;
/**
 * In goes a structured format of all the images, out comes the data that will be saved to /src/data/themes.json
 */
export declare function createThemesFromSpreadsheet(images: Record<Theme, Record<"level" | "maker" | "images", ImageJsonStructure>>): Promise<SpreadsheetDataType>;
export {};
//# sourceMappingURL=createThemes.d.mts.map
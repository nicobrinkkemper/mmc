declare const numberToWords: {
    english: {
        units: string[];
        teens: string[];
        tens: string[];
    };
    englishOrdinal: {
        units: string[];
        teens: string[];
        tens: string[];
    };
};
export declare function convertNumberToWord(number: number, mode?: keyof typeof numberToWords): string;
export {};
//# sourceMappingURL=convertNumberToWord.d.ts.map
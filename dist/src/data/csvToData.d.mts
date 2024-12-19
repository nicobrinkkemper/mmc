export declare function csvToData(data: ThemeCsvLevel[], themeImages?: Images[Theme]): {
    batches: {
        batchNumber: string;
        releaseDate: string;
        levels: {
            images: {
                level: {
                    width: number;
                    height: number;
                    aspectRatio: string;
                    srcSet: string;
                    placeholder: string;
                    src: string;
                };
                levelThumbnail: {
                    width: number;
                    height: number;
                    aspectRatio: string;
                    srcSet: string;
                    placeholder: string;
                    src: string;
                };
                maker: {
                    width: number;
                    height: number;
                    aspectRatio: string;
                    srcSet: string;
                    placeholder: string;
                    src: string;
                };
            };
            mainTheme: string;
            progress: string;
            order: number;
            batchNumber: number;
            releaseDate: string;
            discordName: string;
            difficultyName: string;
            gameStyle: string;
            subTheme: string;
            briefDescription: string;
            clearCondition: string;
            averageClearTime: string;
            description: string;
            makerDescription: string;
            makerId: string;
            difficulty: string;
            nationality: string;
            levelCode: string;
            genre: string;
            isMusicLevel: string;
            levelName: {
                slug: string;
                name: string;
            };
            makerName: {
                slug: string;
                name: string;
            };
            tags: string[];
            image: string;
        }[];
    }[];
    images: ImageJsonStructure;
};
//# sourceMappingURL=csvToData.d.mts.map
import { createMappingsSerializer } from "./createMappingsSerializer.mjs";
/**
 * Gets both source and source map from input source
 * @param inputSource - The input source object
 * @param options - Options for processing
 * @returns Object containing source and source map
 */
export const getSourceAndMap = (inputSource, options) => {
    let code = "";
    let mappings = "";
    const sources = [];
    const sourcesContent = [];
    const names = [];
    const addMapping = createMappingsSerializer(options);
    const { source } = inputSource.streamChunks({ ...options, finalSource: true }, (chunk, generatedLine, generatedColumn, sourceIndex, originalLine, originalColumn, nameIndex) => {
        if (chunk !== undefined)
            code += chunk;
        mappings += addMapping(generatedLine, generatedColumn, sourceIndex, originalLine, originalColumn, nameIndex);
    }, (sourceIndex, source, sourceContent) => {
        while (sources.length < sourceIndex) {
            sources.push(null);
        }
        sources[sourceIndex] = source;
        if (sourceContent !== undefined) {
            while (sourcesContent.length < sourceIndex) {
                sourcesContent.push(null);
            }
            sourcesContent[sourceIndex] = sourceContent;
        }
    }, (nameIndex, name) => {
        while (names.length < nameIndex) {
            names.push(null);
        }
        names[nameIndex] = name;
    });
    return {
        source: source !== undefined ? source : code,
        map: mappings.length > 0
            ? {
                version: 3,
                file: "x",
                mappings,
                sources,
                sourcesContent: sourcesContent.length > 0 ? sourcesContent : undefined,
                names,
            }
            : null,
    };
};
//# sourceMappingURL=getSourceAndMap.mjs.map
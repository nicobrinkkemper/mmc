import { createMappingsSerializer } from "./createMappingsSerializer.mjs";

/**
 * Gets only the source map from input source
 * @param source - The input source object
 * @param options - Options for processing
 * @returns Source map object or null
 */
export const getMap = (
  source: InputSource,
  options: Record<string, unknown>
): SourceMap | null => {
  let mappings = "";
  const sources: (string | null)[] = [];
  const sourcesContent: (string | null)[] = [];
  const names: (string | null)[] = [];
  const addMapping = createMappingsSerializer(options);

  source.streamChunks(
    { ...options, source: false, finalSource: true },
    (
      _chunk,
      generatedLine,
      generatedColumn,
      sourceIndex,
      originalLine,
      originalColumn,
      nameIndex
    ) => {
      mappings += addMapping(
        generatedLine,
        generatedColumn,
        sourceIndex,
        originalLine,
        originalColumn,
        nameIndex
      );
    },
    (sourceIndex, source, sourceContent) => {
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
    },
    (nameIndex, name: string | null) => {
      while (names.length < nameIndex) {
        names.push(null);
      }
      names[nameIndex] = name;
    }
  );

  return mappings.length > 0
    ? {
        version: 3,
        file: "x",
        mappings,
        sources,
        sourcesContent: sourcesContent.length > 0 ? sourcesContent : undefined,
        names,
      }
    : null;
};

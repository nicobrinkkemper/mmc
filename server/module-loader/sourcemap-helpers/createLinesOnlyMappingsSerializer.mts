import { ALPHABET_CHAR, CONTINUATION_BIT } from "./constant.mjs";

/**
 * Creates a serializer that only includes line mapping information
 * @returns A function that serializes line-only source mappings
 */
export const createLinesOnlyMappingsSerializer = (): MappingSerializer => {
  let lastWrittenLine = 0;
  let currentLine = 1;
  let currentSourceIndex = 0;
  let currentOriginalLine = 1;

  return (
    generatedLine: number,
    _generatedColumn: number,
    sourceIndex: number,
    originalLine: number,
    _originalColumn: number,
    _nameIndex: number
  ): string => {
    if (sourceIndex < 0) {
      return "";
    }
    if (lastWrittenLine === generatedLine) {
      return "";
    }

    let str: string;
    const writeValue = (value: number): void => {
      const sign = (value >>> 31) & 1;
      const mask = value >> 31;
      const absValue = (value + mask) ^ mask;
      let data = (absValue << 1) | sign;
      for (;;) {
        const sextet = data & 0x1f;
        data >>= 5;
        if (data === 0) {
          str += ALPHABET_CHAR[sextet];
          break;
        } else {
          str += ALPHABET_CHAR[sextet | CONTINUATION_BIT];
        }
      }
    };

    lastWrittenLine = generatedLine;
    if (generatedLine === currentLine + 1) {
      currentLine = generatedLine;
      if (sourceIndex === currentSourceIndex) {
        if (originalLine === currentOriginalLine + 1) {
          currentOriginalLine = originalLine;
          return ";AACA";
        } else {
          str = ";AA";
          writeValue(originalLine - currentOriginalLine);
          currentOriginalLine = originalLine;
          return str + "A";
        }
      } else {
        str = ";A";
        writeValue(sourceIndex - currentSourceIndex);
        currentSourceIndex = sourceIndex;
        writeValue(originalLine - currentOriginalLine);
        currentOriginalLine = originalLine;
        return str + "A";
      }
    } else {
      str = ";".repeat(generatedLine - currentLine);
      currentLine = generatedLine;
      if (sourceIndex === currentSourceIndex) {
        if (originalLine === currentOriginalLine + 1) {
          currentOriginalLine = originalLine;
          return str + "AACA";
        } else {
          str += "AA";
          writeValue(originalLine - currentOriginalLine);
          currentOriginalLine = originalLine;
          return str + "A";
        }
      } else {
        str += "A";
        writeValue(sourceIndex - currentSourceIndex);
        currentSourceIndex = sourceIndex;
        writeValue(originalLine - currentOriginalLine);
        currentOriginalLine = originalLine;
        return str + "A";
      }
    }
  };
};

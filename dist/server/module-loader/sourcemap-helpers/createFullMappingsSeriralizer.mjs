import { ALPHABET_CHAR, CONTINUATION_BIT } from "./constant.mjs";
/**
 * Creates a serializer that includes full mapping information
 * @returns A function that serializes full source mappings
 */
export const createFullMappingsSerializer = () => {
    let currentLine = 1;
    let currentColumn = 0;
    let currentSourceIndex = 0;
    let currentOriginalLine = 1;
    let currentOriginalColumn = 0;
    let currentNameIndex = 0;
    let activeMapping = false;
    let activeName = false;
    let initial = true;
    return (generatedLine, generatedColumn, sourceIndex, originalLine, originalColumn, nameIndex) => {
        if (activeMapping && currentLine === generatedLine) {
            if (sourceIndex === currentSourceIndex &&
                originalLine === currentOriginalLine &&
                originalColumn === currentOriginalColumn &&
                !activeName &&
                nameIndex < 0) {
                return "";
            }
        }
        else {
            if (sourceIndex < 0) {
                return "";
            }
        }
        let str;
        if (currentLine < generatedLine) {
            str = ";".repeat(generatedLine - currentLine);
            currentLine = generatedLine;
            currentColumn = 0;
            initial = false;
        }
        else if (initial) {
            str = "";
            initial = false;
        }
        else {
            str = ",";
        }
        const writeValue = (value) => {
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
                }
                else {
                    str += ALPHABET_CHAR[sextet | CONTINUATION_BIT];
                }
            }
        };
        writeValue(generatedColumn - currentColumn);
        currentColumn = generatedColumn;
        if (sourceIndex >= 0) {
            activeMapping = true;
            if (sourceIndex === currentSourceIndex) {
                str += "A";
            }
            else {
                writeValue(sourceIndex - currentSourceIndex);
                currentSourceIndex = sourceIndex;
            }
            writeValue(originalLine - currentOriginalLine);
            currentOriginalLine = originalLine;
            if (originalColumn === currentOriginalColumn) {
                str += "A";
            }
            else {
                writeValue(originalColumn - currentOriginalColumn);
                currentOriginalColumn = originalColumn;
            }
            if (nameIndex >= 0) {
                writeValue(nameIndex - currentNameIndex);
                currentNameIndex = nameIndex;
                activeName = true;
            }
            else {
                activeName = false;
            }
        }
        else {
            activeMapping = false;
        }
        return str;
    };
};
//# sourceMappingURL=createFullMappingsSeriralizer.mjs.map
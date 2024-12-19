import {
  ALPHABET,
  CONTINUATION_BIT,
  DATA_MASK,
  END_SEGMENT_BIT,
  INVALID,
  NEXT_LINE,
} from "./constant.mjs";

/**
 * Lookup table for character code to value conversion
 */
const ccToValue = new Uint8Array("z".charCodeAt(0) + 1);
{
  ccToValue.fill(INVALID);
  for (let i = 0; i < ALPHABET.length; i++) {
    ccToValue[ALPHABET.charCodeAt(i)] = i;
  }
  ccToValue[",".charCodeAt(0)] = END_SEGMENT_BIT;
  ccToValue[";".charCodeAt(0)] = NEXT_LINE;
}
const ccMax = ccToValue.length - 1;

/**
 * Reads source map mappings and calls the provided callback for each mapping
 * @param mappings - The mappings string to parse
 * @param onMapping - Callback function called for each mapping
 */
const readMappings = (mappings: string, onMapping: MappingCallback): void => {
  // generatedColumn, [sourceIndex, originalLine, orignalColumn, [nameIndex]]
  const currentData = new Uint32Array([0, 0, 1, 0, 0]);
  let currentDataPos = 0;
  // currentValue will include a sign bit at bit 0
  let currentValue = 0;
  let currentValuePos = 0;
  let generatedLine = 1;
  let generatedColumn = -1;

  for (let i = 0; i < mappings.length; i++) {
    const cc = mappings.charCodeAt(i);
    if (cc > ccMax) continue;
    const value = ccToValue[cc];

    if ((value & END_SEGMENT_BIT) !== 0) {
      // End current segment
      if (currentData[0] > generatedColumn) {
        if (currentDataPos === 1) {
          onMapping(generatedLine, currentData[0], -1, -1, -1, -1);
        } else if (currentDataPos === 4) {
          onMapping(
            generatedLine,
            currentData[0],
            currentData[1],
            currentData[2],
            currentData[3],
            -1
          );
        } else if (currentDataPos === 5) {
          onMapping(
            generatedLine,
            currentData[0],
            currentData[1],
            currentData[2],
            currentData[3],
            currentData[4]
          );
        }
        generatedColumn = currentData[0];
      }
      currentDataPos = 0;
      if (value === NEXT_LINE) {
        // Start new line
        generatedLine++;
        currentData[0] = 0;
        generatedColumn = -1;
      }
    } else if ((value & CONTINUATION_BIT) === 0) {
      // last sextet
      currentValue |= value << currentValuePos;
      const finalValue =
        currentValue & 1 ? -(currentValue >> 1) : currentValue >> 1;
      currentData[currentDataPos++] += finalValue;
      currentValuePos = 0;
      currentValue = 0;
    } else {
      currentValue |= (value & DATA_MASK) << currentValuePos;
      currentValuePos += 5;
    }
  }

  // End current segment
  if (currentDataPos === 1) {
    onMapping(generatedLine, currentData[0], -1, -1, -1, -1);
  } else if (currentDataPos === 4) {
    onMapping(
      generatedLine,
      currentData[0],
      currentData[1],
      currentData[2],
      currentData[3],
      -1
    );
  } else if (currentDataPos === 5) {
    onMapping(
      generatedLine,
      currentData[0],
      currentData[1],
      currentData[2],
      currentData[3],
      currentData[4]
    );
  }
};

export { readMappings };

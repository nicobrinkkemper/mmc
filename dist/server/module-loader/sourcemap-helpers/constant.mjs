/**
 * The alphabet used for Base64 VLQ encoding
 */
export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
export const ALPHABET_CHAR = ALPHABET.split("");
/**
 * Bit flag indicating continuation in VLQ encoding
 */
export const CONTINUATION_BIT = 0x20;
export const END_SEGMENT_BIT = 0x40;
export const NEXT_LINE = END_SEGMENT_BIT | 0x01;
export const INVALID = END_SEGMENT_BIT | 0x02;
export const DATA_MASK = 0x1f;
//# sourceMappingURL=constant.mjs.map
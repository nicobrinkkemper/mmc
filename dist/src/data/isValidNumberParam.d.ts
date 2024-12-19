/**
 * The things is, the order and batchNumber should be numbers, but they can continue from the previous batch or even the previous theme, as is the case of 5ymm, 6ymm.
 * So this check is simply to make sure that we are not going out of bounds.
 * While still respecting the order given in the spreadsheets.
 */
export declare const isValidNumberParam: (n: unknown, min: number | string, length: number) => boolean;
//# sourceMappingURL=isValidNumberParam.d.ts.map
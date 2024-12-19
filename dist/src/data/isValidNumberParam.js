/**
 * The things is, the order and batchNumber should be numbers, but they can continue from the previous batch or even the previous theme, as is the case of 5ymm, 6ymm.
 * So this check is simply to make sure that we are not going out of bounds.
 * While still respecting the order given in the spreadsheets.
 */
export const isValidNumberParam = (n, min, length) => {
    const number = Number(n);
    const minNumber = Number(min);
    if (isNaN(number)) {
        console.warn(`\`${n}\` can not not be coerced to a number. (numberIsNan)`);
        return false;
    }
    if (isNaN(minNumber)) {
        console.warn(`\`${min}\` can not not be coerced to a number. (minNumberIsNan)`);
        return false;
    }
    const tooSmall = number < minNumber;
    if (tooSmall) {
        console.warn(`\`${n}\` is too small, expected at least \`${minNumber}\` (tooSmall)`);
        return false;
    }
    const tooBig = number > minNumber + (length - 1);
    if (tooBig) {
        console.warn(`\`${n}\` is too big, expected at most \`${minNumber + (length - 1)}\` (tooBig)`);
        return false;
    }
    return true;
};
//# sourceMappingURL=isValidNumberParam.js.map
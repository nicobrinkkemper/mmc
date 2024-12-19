const numberToWords = {
    english: {
        units: ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
        teens: ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'],
        tens: ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
    },
    englishOrdinal: {
        units: ['', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth'],
        teens: ['tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'],
        tens: ['', '', 'twentieth', 'thirtieth', 'fortieth', 'fiftieth', 'sixtieth', 'seventieth', 'eightieth', 'ninetieth']
    },
};
export function convertNumberToWord(number, mode = 'english') {
    if (!Number.isInteger(number) || number < 1) {
        return `${number}th`;
    }
    const { units, teens, tens } = numberToWords[mode];
    if (number < 10) {
        return units[number];
    }
    else if (number >= 10 && number < 20) {
        return teens[number - 10];
    }
    else {
        const unitDigit = number % 10;
        const tenDigit = Math.floor(number / 10) % 10;
        return `${tens[tenDigit]}${unitDigit !== 0 ? units[unitDigit] : ''}`;
    }
}
//# sourceMappingURL=convertNumberToWord.js.map
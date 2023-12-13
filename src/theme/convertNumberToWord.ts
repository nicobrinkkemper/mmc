

const numberToWords = {
  english: {
    units: ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'],
    teens: ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'],
    tens: ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
  },
  englishOrdinal: {
    units:['', 'First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth'],
    teens:['Tenth', 'Eleventh', 'Twelfth', 'Thirteenth', 'Fourteenth', 'Fifteenth', 'Sixteenth', 'Seventeenth', 'Eighteenth', 'Nineteenth'],
    tens: ['', 'Tenth', 'Twentieth', 'Thirtieth', 'Fortieth', 'Fiftieth', 'Sixtieth', 'Seventieth', 'Eightieth', 'Ninetieth']
  }
}

export function convertNumberToWord(number: number, mode: keyof typeof numberToWords = 'english'): string {
  if (!Number.isInteger(number) || number < 1) {
    return `${number}th`;
  }
  const {units, teens, tens} = numberToWords[mode];

  if (number < 10) {
    return units[number];
  } else if (number >= 10 && number < 20) {
    return teens[number - 10];
  } else {
    const unitDigit = number % 10;
    const tenDigit = Math.floor(number / 10) % 10;

    return `${tens[tenDigit]}${unitDigit !== 0 ? units[unitDigit] : ''}`;
  }
}



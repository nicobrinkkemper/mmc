type themeConfigDefinition = {
  [key: string]: { gid: number; weektrailers: string[] };
};
// to add a new theme to the website, add a new key-value pair to the themeConfig object
// if the theme starts with a number or special character, use the _ prefix (it will be ignored)
// The gid, which is a reference to the TAB in the spreadsheet
export const themeConfig = {
  _7mmc: {
    gid: 0,
    weektrailers: [
      "PbKK8_liEqA",
      "s5QguY9AAig",
      "ZE8hAA6mi2Y",
      "Ju_XQ1RKnU8",
      "dn3EvFPRsls",
      "DXE5-MfeGAs",
    ],
  },
  _8mmc: {
    gid: 1776023134,
    weektrailers: ["X7502D3SSy4"],
  },
} satisfies themeConfigDefinition;

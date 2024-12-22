export const mainTheme = "9mmc";

export const siteName = "Yearly Mario Maker Celebrations' Official Site";
export const url = "https://mmcelebration.com";

const link = (gid: number) => ({
  gid,
  link: `https://docs.google.com/spreadsheets/d/e/2PACX-1vROk4rxqS9jPImRfwqL6T6pFHJSBs4Gx3O9JUzabTeDA0aZrr2xccinxeuWhSNJJflByzbE63CAkZj0/pub?gid=${gid}&single=true&output=csv`,
});

export const themeConfig = {
  _4ymm: {
    googleSheet: link(1010271799),
    weekTrailers: [
      "iY6Qj6L_oF0",
      "WUWn1gQIs_8",
      "AdKyII4NjvQ",
      "PBVWDbYInLw",
      "SbYdb2UvH78",
      "riPeVvp6Zzo",
      "8zSCJDWJUvM",
      "OHwd3qGiFOU",
    ],
  },
  _5ymm: {
    googleSheet: link(588603541),
    weekTrailers: ["b26QvbP4MUI", "-f83uRDCZpA", "ouKbaTu5YKc", "13Sb6V8ydPM"],
  },
  _6ymm: {
    googleSheet: link(1708788134),
    weekTrailers: [
      "G4mhHeXk3k0",
      "lANqCC2xPoo",
      "rvBtTv9aeo0",
      "oR_7lE_Zx2c",
      "VLiyJwx5T3E",
    ],
  },
  _7mmc: {
    googleSheet: link(0),
    weekTrailers: [
      "PbKK8_liEqA",
      "s5QguY9AAig",
      "ZE8hAA6mi2Y",
      "Ju_XQ1RKnU8",
      "dn3EvFPRsls",
      "DXE5-MfeGAs",
    ],
  },
  _8mmc: {
    googleSheet: link(1776023134),
    weekTrailers: ["X7502D3SSy4"],
  },
  _9mmc: {
    googleSheet: link(614218153),
    weekTrailers: [
      "", // if no trailer, leave empty
    ],
  },
} satisfies {
  [key: string]: {
    googleSheet: {
      gid: number;
      link: string;
    };
    weekTrailers: string[];
  };
};

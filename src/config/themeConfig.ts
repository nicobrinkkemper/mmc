import { createConfig } from "./createConfig.js";

export const mainTheme = "9mmc";

export const siteName = "Yearly Mario Maker Celebrations' Official Site";
export const url = "https://mmcelebration.com";

export const themeConfig = [
  createConfig({
    theme: "4ymm",
    gid: 1010271799,
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
  }),
  createConfig({
    theme: "5ymm",
    gid: 588603541,
    weekTrailers: ["b26QvbP4MUI", "-f83uRDCZpA", "ouKbaTu5YKc", "13Sb6V8ydPM"],
  }),
  createConfig({
    theme: "6ymm",
    gid: 1708788134,
    weekTrailers: ["G4mhHeXk3k0", "lANqCC2xPoo", "rvBtTv9aeo0", "oR_7lE_Zx2c"],
  }),
  createConfig({
    theme: "7mmc",
    gid: 0,
    weekTrailers: [
      "PbKK8_liEqA",
      "s5QguY9AAig",
      "ZE8hAA6mi2Y",
      "Ju_XQ1RKnU8",
      "dn3EvFPRsls",
      "DXE5-MfeGAs",
    ],
  }),
  createConfig({
    theme: "8mmc",
    gid: 1776023134,
    weekTrailers: ["X7502D3SSy4"],
  }),
  createConfig({
    theme: "9mmc",
    gid: 614218153,
    weekTrailers: [], // if no trailer, leave empty
  }),
] as const;

/**
 * Collection of keys. These keys are more safe to use for object keys, since they do not start with a number.
 */
export const themeKeys: ThemeKeys = themeConfig.map(
  (config) => config.key
) as ThemeKeys;

/**
 * Collection of all the themes as a tuple
 */
export const themes: Themes = themeConfig.map(
  (config) => config.theme
) as Themes;

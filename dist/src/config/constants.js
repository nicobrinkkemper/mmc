export const mainTheme = "9mmc";
export const themeConfig = {
    _4ymm: {
        gid: 1010271799,
        weektrailers: [
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
        gid: 588603541,
        weektrailers: ["b26QvbP4MUI", "-f83uRDCZpA", "ouKbaTu5YKc", "13Sb6V8ydPM"],
    },
    _6ymm: {
        gid: 1708788134,
        weektrailers: [
            "G4mhHeXk3k0",
            "lANqCC2xPoo",
            "rvBtTv9aeo0",
            "oR_7lE_Zx2c",
            "VLiyJwx5T3E",
        ],
    },
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
    _9mmc: {
        gid: 614218153, // 9mmc tab in spreadsheet
        weektrailers: [
            "", // if no trailer, leave empty
        ],
    },
};
export const DEFAULT_DESCRIPTION = "Yearly Mario Maker Celebrations' Official Site";
export const PUBLIC_URL = typeof import.meta?.env !== "undefined"
    ? import.meta?.env?.["VITE_PUBLIC_URL"]
    : // @ts-ignore
        process?.env?.["VITE_PUBLIC_URL"] ?? "/";
export const BASE_URL = typeof import.meta?.env !== "undefined"
    ? import.meta.env?.["VITE_BASE_URL"]
    : // @ts-ignore
        process?.env?.["VITE_PUBLIC_URL"] ?? "https://mmcelebration.com";
//# sourceMappingURL=constants.js.map
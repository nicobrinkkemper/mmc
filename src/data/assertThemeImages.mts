export function assertThemeImages(i: any): asserts i is Images[Theme] {
  if (!i) {
    throw new Error("images is undefined");
  }
  if ("level" in i && !i?.level) {
    throw new Error("level is undefined");
  }
  if ("maker" in i && !i?.maker) {
    throw new Error("maker is undefined");
  }
  if ("images" in i && !i?.images) {
    throw new Error("images is undefined");
  }
}

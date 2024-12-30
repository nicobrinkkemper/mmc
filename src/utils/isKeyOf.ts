export const isKeyOf = <T extends object>(
  key: keyof T | string,
  obj: T
): key is keyof T =>
  key in obj && typeof obj[key as keyof typeof obj] !== "undefined";

export const pickRequired = <T extends {}, K extends keyof T>(
  obj: T,
  keys: K[],
  errorMessage = "required"
) => {
  try {
    return Object.fromEntries(
      keys.map((key) => {
        if (obj && typeof obj === "object" && key in obj) {
          return [key, obj[key]];
        }
        throw new Error(`required ${errorMessage} ${String(key)}`);
      })
    ) as Pick<T, K>;
  } catch (error) {
    console.error(error);
    return undefined as never;
  }
};

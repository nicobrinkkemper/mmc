export const pickRequired = <T extends {}, K extends keyof T>(
  obj: T,
  keys: K[],
  errorMessage = "required"
) =>
  Object.fromEntries(
    keys.map((key) => {
      if (key in obj) {
        return [key, obj[key]];
      }
      throw new Error(`required ${errorMessage} ${String(key)}`);
    })
  ) as Pick<T, K>;

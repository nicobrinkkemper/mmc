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
      console.error(errorMessage ?? "required");
      throw new Error(
        `${errorMessage}\n${String(key)} not in ${Object.keys(obj).join(", ")}`
      );
    })
  ) as Pick<T, K>;

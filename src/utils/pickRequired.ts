export const pickRequired = <T extends {}, K extends keyof T>(
  obj: T,
  keys: K[]
) => {
  return keys.reduce((acc = {}, key) => {
    acc[key] = obj[key];
    if (!acc[key]) {
      console.log(obj, key, acc[key]);
      throw new Error(
        `Key ${String(key)} is required, available: ${Object.keys(obj).join(
          ", "
        )}`
      );
    }
  }, {} as any) as Pick<T, K>;
};

import { pickRequired } from "./pickRequired.js";

export function assertObject<T, K extends keyof T>(
  obj: {
    [k in keyof T]: T[k];
  },
  keys: K[]
): asserts obj is T {
  pickRequired(obj, keys);
}

import { BASE_URL } from "../config/constants.js";

export const absoluteUrl = <P extends string>(path: P) => {
  if (path.startsWith("http")) return path;
  if (path.startsWith("/")) return `${BASE_URL}${path}`;
  return `${BASE_URL}/${path}` as const;
};

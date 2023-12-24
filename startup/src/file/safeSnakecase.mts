import _ from "lodash";

export const safeSnakecase = (name: string) =>
  _.snakeCase(name.replace(/[\W_]+/g, "_").toLowerCase());

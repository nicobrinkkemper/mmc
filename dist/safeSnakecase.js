import _ from "lodash";
export const safeSnakecase = (name) => _.snakeCase(name.replace(/[\W_]+/g, "_").toLowerCase());

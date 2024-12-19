import { snakeCase } from "lodash-es";
/**
 * This returns the same snakecase for all the maker names and levels on a browser and node.js.
 * This is important because we have to name them manually and put them in the folder ourselves - and make them part of the codebase.
 */
export const safeSnakecase = (name) => snakeCase(name.replace(/[\W_]+/g, "_").toLowerCase());
//# sourceMappingURL=safeSnakecase.mjs.map
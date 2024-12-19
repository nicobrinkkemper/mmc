// before we define the config, we take the change to define the types we want from the csv and reuse elsewhere throughout the codebase
import { themeConfig } from "./constants.js";
export const themeKeys = Object.keys(themeConfig);
export const themeKeysNoPrefix = themeKeys.map((key) => key.replace("_", ""));
//# sourceMappingURL=keys.js.map
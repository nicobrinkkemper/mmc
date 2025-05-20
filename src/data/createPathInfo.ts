import { credits, mainTheme } from "../config/themeConfig.js";

import { levels } from "../config/themeConfig.js";

const remove = (search: string, p: string) =>
  search !== "" && p.includes(search)
    ? `${p}`.replace(`/${search}/`, "/").replace(`/${search}`, "/")
    : p;

/**
 * If you need to add things to the path info, you can add them here, it should at least receive the route object
 */
export const createPathInfo = <R extends string>({
  theme = mainTheme,
  batchNumber = "",
  order = "",
  to,
  ...rest
}: Route<R>) => {
  const path = theme ? remove(theme, to) : to;

  return {
    to,
    path,
    theme,
    // navigation links, feel free to add more if you need them
    toHome: `/${theme}` as const,
    toLevels: `/${theme}/${levels}` as const,
    toCredits: `/${theme}/${credits}` as const,
    toAbout: `#!/about` as const,
    toLevel:
      order !== "" && batchNumber !== ""
        ? `/${theme}/${levels}/${batchNumber}/${order}`
        : undefined,
    toBatch:
      batchNumber !== "" ? `/${theme}/${levels}/${batchNumber}` : undefined,
    params: {
      batchNumber,
      order,
    },
    ...rest,
  } as R extends keyof PathMap ? ThemePathInfo<R> : ThemePathInfo;
};

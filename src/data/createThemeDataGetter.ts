export const createThemeDataGetter =
  <K extends keyof ThemeDataOptions>(key: K, errorMessage: string) =>
  (
    opts: ThemeDataOptions,
    staticData: Record<string, any>
  ): { [P in K]?: any } | { error: string } | null => {
    const option = opts[key];
    const hasData = key in staticData;

    return option === true && hasData
      ? ({ [key]: staticData[key] } as { [P in K]: any })
      : option
      ? { error: errorMessage }
      : null;
  };

export const createThemeDataGetter = (key, errorMessage) => (opts, staticData) => {
    const option = opts[key];
    const hasData = key in staticData;
    return option === true && hasData
        ? { [key]: staticData[key] }
        : option
            ? { error: errorMessage }
            : null;
};
//# sourceMappingURL=createThemeDataGetter.js.map
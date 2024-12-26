export const createRoute: ThemeRouteCreator<AnyPage> = (staticData, Page) => ({
  path: staticData.pathInfo.to,
  staticData,
  component: Page,
});

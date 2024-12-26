import * as React from "react";
declare global {
  type ThemeStaticData<
    P extends ValidPath,
    Options extends ThemeDataOptions = {
      pathInfo: true;
      images: ["logo", "illustration"];
      adjacent: P extends `/${Theme}`
        ? true
        : P extends `/${Theme}/levels`
        ? true
        : P extends `/${Theme}/credits`
        ? true
        : undefined;
    },
    PathInfo extends ThemePathInfo<P, Segments<P>> = ThemePathInfo<
      P,
      Segments<P>
    >
  > = ThemeData<P, Options, Segments<P>, PathInfo>;

  /**
   * Helper to create a page aware component for a theme
   * @example
   * ```tsx
   * const CreditsPage: ThemePageComponent<"/4ymm/credits"> = ({ pathInfo, images, adjacent, clickable }) => {
   *   return <div>Credits</div>;
   * };
   * // and since it's aware of URL props, you can use it to create a level pagge and legel page components
   * const LevelCard: ThemePageComponent<"/4ymm/level/1/1", { level: true }> = ({ level }) => {
   *   return <div>Level</div>;
   * };
   * ```
   */
  type ThemePageComponent<
    Path extends ValidPath = `/${Theme}`,
    Opt extends ThemeDataOptions = {
      pathInfo: true;
      images: ["logo"];
      clickable: true;
    },
    As extends keyof React.JSX.IntrinsicElements = "div"
  > = (
    props: ThemeData<Path, Opt> & React.JSX.IntrinsicElements[As]
  ) => React.ReactNode;

  type Component<
    Path extends ValidPath = `/${Theme}`,
    Opt extends ThemeDataOptions = {},
    As extends keyof React.JSX.IntrinsicElements = "div"
  > = (
    props: ThemeData<Path, Opt> & React.JSX.IntrinsicElements[As]
  ) => React.ReactNode;

  /**
   * Helper to create a component for a theme.
   * @example
   * ```tsx
   * const App: ThemeComponent = ({ pathInfo, images, clickable }) => {
   *   return <div>App</div>;
   * };
   * // if you need more props
   * const Welcome: ThemeComponent<{
   *    images: 'illustration'
   * }> = ({ images, clickable }) => {
   *   return <div><PublicPage {...images.illustration} /></div>;
   * };
   * ```
   */
  type ThemeComponent<
    Opt extends ThemeDataOptions = {
      pathInfo: true;
    },
    As extends keyof React.JSX.IntrinsicElements = "div"
  > = (
    props: ThemeData<ValidPath, Opt> & React.JSX.IntrinsicElements[As]
  ) => React.ReactNode;

  type ThemeRouteCreator<As extends AnyPage = AnyPage> = (
    staticData: Parameters<As>[0],
    component: As
  ) => {
    path: Parameters<As>[0]["pathInfo"]["to"];
    staticData: typeof staticData;
    component: typeof component;
  };
}

export {};

import * as React from "react";
declare global {
  type ThemeStaticData<
    P extends ValidPath,
    PI extends ThemePathInfo<P>,
    Opt extends ThemeDataOptions = {}
  > = ThemeData<P, Opt> & PI;

  type ThemeStaticDataFn = <
    P extends ValidPath,
    PI extends ThemePathInfo<P>,
    Opt extends ThemeDataOptions
  >(
    pathInfo: PI,
    options?: Opt
  ) => ThemeStaticData<P, PI, Opt>;

  type ThemeUtil<
    P extends ValidPath,
    Opt extends ThemeDataOptions = ThemeDataOptions,
    Custom = Record<never, never>,
    Return = any
  > = (props: ThemeData<P, Opt> & Custom) => Return;

  /**
   * Helper to create a page aware component for a theme
   * @example
   * ```tsx
   * const CreditsPage: ThemePageComponent<"/4ymm/credits"> = ({ pathInfo, images, adjacent, clickable }) => {
   *   return <div>Credits</div>;
   * };
   * ```
   */
  type ThemePageComponent<
    R extends ValidRoute,
    Props extends ReturnType<PageMap[R]["props"]> = ReturnType<
      PageMap[R]["props"]
    >,
    As extends keyof React.JSX.IntrinsicElements = "div"
  > = (props: Props & React.JSX.IntrinsicElements[As]) => React.ReactNode;

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
    As extends string = "div",
    Custom extends Record<string, unknown> = Record<never, never>
  > = ThemeUtil<
    ValidPath,
    Opt,
    (As extends keyof React.JSX.IntrinsicElements
      ? React.JSX.IntrinsicElements[As]
      : {}) &
      Custom,
    React.ReactNode
  >;

  type ThemeRouteCreatorReturn<
    P extends ValidPath,
    T,
    As extends React.ComponentType<T> = React.ComponentType<T>
  > = {
    path: P;
    staticData: T;
    component: As;
  };
  /**
   * To make the createRoute function work
   * @example
   * ```tsx
   * export const createRoute: ThemeRouteCreator<AnyPage> = (staticData, Page) => ({
   *   path: staticData.pathInfo.to,
   *   staticData,
   *   component: Page,
   * });
   * ```
   */
  type ThemeRouteCreatorFn = <
    P extends ValidPath,
    T,
    As extends React.ComponentType<T> = React.ComponentType<T>
  >(
    path: P,
    staticData: T,
    component: As
  ) => ThemeRouteCreatorReturn<P, T, As>;
}

export {};


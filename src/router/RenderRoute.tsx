import * as React from "react";
import { pages } from "../page/pages.js";

/**
 * Agnostic router for RSC. It uses `getThemePathInfo` output to get information about the path.
 *
 */
export function RenderRoute({
  pathInfo,
  layout: Layout,
  props = {
    clickable: "a",
  },
  layoutProps = {},
}: {
  pathInfo: ThemePathInfo;
  layout: (
    props: React.PropsWithChildren<
      Required<HtmlProps> & { pathInfo: ThemePathInfo }
    >
  ) => React.ReactNode;
  props?: {
    clickable?: React.ElementType;
  };
  layoutProps?: React.PropsWithChildren<Partial<HtmlProps>>;
}) {
  if (!(pathInfo.route in pages)) {
    throw new Error(`Page not found for ${JSON.stringify(pathInfo.route)}`);
  }
  const { Page, props: propsFn } = pages[pathInfo.route as keyof typeof pages];
  const data = propsFn(pathInfo.to);
  if (!data) {
    throw new Error(`Page not found for ${JSON.stringify(pathInfo)}`);
  }
  return (
    <Layout
      {...data}
      {...layoutProps}
      pathInfo={pathInfo}
      key={pathInfo.to + pathInfo.hash}
    >
      <Page {...(data as any)} {...props} pathInfo={pathInfo} />
    </Layout>
  );
}

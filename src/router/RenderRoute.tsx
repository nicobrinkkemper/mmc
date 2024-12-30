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
  pathInfo: ThemePathInfo<ValidPath>;
  layout: (
    props: React.PropsWithChildren<Required<HtmlProps>>
  ) => React.ReactNode;
  props?: {
    clickable?: React.ElementType;
  };
  layoutProps?: React.PropsWithChildren<Partial<HtmlProps>>;
}) {
  if (!(pathInfo.route in pages)) {
    throw new Error(`Page not found for ${JSON.stringify(pathInfo.route)}`);
  }
  const { Page, props: propsFn } = pages[pathInfo.route];
  const data = propsFn(pathInfo.to);
  if (!data) {
    throw new Error(`Page not found for ${JSON.stringify(pathInfo)}`);
  }
  return (
    <Layout {...data} {...layoutProps}>
      <Page {...(data as any)} {...props} />
    </Layout>
  );
}

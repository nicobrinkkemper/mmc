import * as React from "react";
import { contentsKeys } from "./contents.js";
import { getContent } from "./getContent.js";

function ContentAt<
  P extends ValidPath,
  Key extends ContentKey,
  Props extends ContentComponentWithThemeProps<P, Key>
>({ at, pathInfo, ...props }: Readonly<{ at: Key; pathInfo: ThemePathInfo<P>  } & Props>) {
  if (!pathInfo) {
    throw new Error("PathInfo is required for a Content component");
  }
  const Component = getContent(pathInfo.theme, at);
  return <Component {...((props ?? {}) as any)} />;
}

export const Content = Object.fromEntries(
  contentsKeys.map((at) => [
    at,
    (props: any) => <ContentAt at={at} {...(props ?? {})} />,
  ])
) as {
  [Key in ContentKey]: ContentComponentWithTheme<Key>;
};

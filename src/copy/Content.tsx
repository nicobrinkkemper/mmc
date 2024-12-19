import * as React from "react";
import { contentsKeys } from "./contents.js";
import { getContent } from "./getContent.js";

function ContentAt<
  Key extends ContentKey,
  P extends ContentComponentWithThemeProps<Key>
>({ at, theme, ...props }: Readonly<{ at: Key; theme: Theme } & P>) {
  if (!theme) {
    throw new Error("Theme is required for a Content component");
  }
  const Component = getContent(theme, at);
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

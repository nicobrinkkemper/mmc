import * as React from "react";
import { contentsKeys } from "./contents.js";
import { getContent } from "./getContent.js";

const ContentAt: ContentAtFn = ({ at, pathInfo, ...props }) => {
  if (!pathInfo) {
    throw new Error("PathInfo is required for a Content component");
  }
  if (!pathInfo.theme) {
    throw new Error(
      `No theme found in pathInfo, you need to request it as a type via \`pathInfo:['theme']\`. available: ${JSON.stringify(
        pathInfo,
        null,
        2
      )}`
    );
  }
  const Component: any = getContent(pathInfo.theme, at);
  return <Component pathInfo={pathInfo} {...props} />;
};

export const Content = Object.fromEntries(
  contentsKeys.map((at) => [
    at,
    (props: any) => <ContentAt at={at} {...props} />,
  ])
) as {
  [Key in ContentKey]: ContentComponent<Key>;
};

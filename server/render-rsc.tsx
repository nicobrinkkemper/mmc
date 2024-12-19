import * as React from "react";

export function RenderRsc({
  staticData,
  component: Component,
}: {
  path: string;
  component: React.ComponentType;
  staticData: Omit<HtmlProps, "children">;
}) {
  return <Component {...(staticData as any)} />;
}

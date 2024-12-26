import * as React from "react";

export function RenderRsc<P extends ValidPath>({
  staticData,
  component: Component,
}: {
  path: string;
  component: React.ComponentType<ThemeStaticData<P>>;
  staticData: Omit<HtmlProps, "children">;
}) {
  return <Component {...(staticData as any)} />;
}

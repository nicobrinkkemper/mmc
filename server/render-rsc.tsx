import * as React from "react";
import { rsc_port } from "./constants.js";

console.log(`Listening on http://localhost:${rsc_port}`);

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

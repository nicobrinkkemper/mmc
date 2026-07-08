import * as React from "react";
import { Page as HomePage } from "./$theme/page.js";
import { Layout as ThemeLayout } from "./$theme/route.js";
/**
 * Root page: the main theme's home. `/` sits above the `$theme` segment, so the
 * dynamic theme layout doesn't wrap it automatically — apply it here so the
 * main theme's `.Theme` class is present, same as any other theme route.
 */
export const Page: ThemePageComponent<"/"> = (props) => {
  if (!props) {
    throw new Error("props is undefined");
  }
  return (
    <ThemeLayout pathInfo={{ theme: props.pathInfo.theme }}>
      <HomePage {...props} />
    </ThemeLayout>
  );
};

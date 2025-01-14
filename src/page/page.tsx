import * as React from "react";
import { Page as HomePage } from "./_theme/page.js";
/**
 * This is the root page. We will just render the home page using the main theme.
 */
export const Page: ThemePageComponent<"/"> = (props) => {
  return <HomePage {...props} />;
};

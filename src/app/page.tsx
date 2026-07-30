import { Page as HomePage } from "./$theme/page.js";
import { Layout as MainThemeLayout } from "./10mmc/route.js";
/**
 * Root page: the main theme's home. `/` sits above the theme segment, so wrap
 * it in the main theme's layout (10mmc) directly — the same `.Theme` div every
 * theme route gets. Keep in sync with `mainTheme` in themeConfig.
 */
export const Page: ThemePageComponent<"/"> = (props) => {
  if (!props) {
    throw new Error("props is undefined");
  }
  return (
    <MainThemeLayout>
      <HomePage {...props} />
    </MainThemeLayout>
  );
};

import { StrictMode } from "react";
import { HelmetProvider } from "react-helmet-async";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { App } from "./App";
import { PUBLIC_URL } from "./constants";
import ThemeDataProvider from "./data/ThemeDataProvider";
import { themeKeys } from "./data/themeKeys";
import { ThemeProvider } from "./theme/ThemeProvider";

const router = createBrowserRouter(
  [
    {
      path: "*",
      index: true,
      element: (
        <ThemeProvider theme={"8mmc"}>
          <App />
        </ThemeProvider>
      ),
    },
    ...themeKeys.flatMap((theme): [RouteObject] => [
      {
        path: `${theme}/*`,
        element: (
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        ),
      },
    ]),
  ],
  {
    // this is important for GitHub Pages
    basename: PUBLIC_URL,
  }
);

export function AppWrapper() {
  return (
    <StrictMode>
      <HelmetProvider>
        <ThemeDataProvider>
          <RouterProvider router={router} />
        </ThemeDataProvider>
      </HelmetProvider>
    </StrictMode>
  );
}

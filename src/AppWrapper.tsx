import { App } from "./App";
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./theme/ThemeProvider";
import { PUBLIC_URL } from "./constants";
import { themeKeys } from "./data/themeKeys";
import { StrictMode } from "react";
import ThemeDataProvider from "./data/ThemeDataProvider";

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


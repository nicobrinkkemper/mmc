import { App } from "./App";
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./theme/ThemeProvider";
import { themeKeys } from "./theme/ThemeContext";
import { PUBLIC_URL } from "./constants";

const router = createBrowserRouter([{
  path: '*',
  index: true,
  element: (<ThemeProvider theme={'8mmc'}>
    <App />
  </ThemeProvider >
  ),
}, ...themeKeys.flatMap((theme): [RouteObject] => [
  {
    path: `${theme}/*`,
    element: (<ThemeProvider theme={theme}>
      <App />
    </ThemeProvider >
    ),
  }]
)], {
  basename: PUBLIC_URL
});

export function AppWrapper() {
  return (

    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider >
  )
}


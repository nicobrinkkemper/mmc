import App from "./App";
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./theme/ThemeProvider";
import { themeKeys } from "./theme/ThemeContext";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";
import { BASE_URL } from "./constants";


const router = createBrowserRouter([{
  path: '*',
  index: true,
  element: (<ThemeProvider theme={'8mmc'}>
    <App />
  </ThemeProvider >
  ),
}, ...themeKeys.map((theme): RouteObject => (
  {
    path: `${theme}/*`,
    element: (<ThemeProvider theme={theme}>
      <App />
    </ThemeProvider >
    ),
  }
))], {
  basename: BASE_URL
});

const AppWrapper = () => (
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
  >
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider >
  </ErrorBoundary>
);

export { AppWrapper };
export default AppWrapper;

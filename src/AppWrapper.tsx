import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./theme/ThemeProvider";
import { Theme, themeKeys } from "./theme/ThemeContext";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";

const themeRoutes = ['', ...themeKeys].map((theme) => (
  {
    path: `${theme}/*`,
    element: (<ThemeProvider theme={theme}>
      <App />
    </ThemeProvider >
    ),
  }
))

const router = createBrowserRouter(themeRoutes);

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

import App from "App";
import { BrowserRouter, BrowserRouterProps } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

const AppWrapper = ({
  routerProps = {},
}: {
  routerProps?: BrowserRouterProps;
}) => (
  <HelmetProvider>
    <BrowserRouter {...routerProps}>
      <div className="App-wrapper">
        <App />
      </div>
    </BrowserRouter>
  </HelmetProvider>
);

export { AppWrapper };
export default AppWrapper;

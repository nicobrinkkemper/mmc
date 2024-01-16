import ReactDOM, { hydrateRoot } from "react-dom/client";
import { AppWrapper } from "./AppWrapper";
import "./index.css";
import { getState } from "loadable-components";

declare global {
  interface Window {
    snapSaveState: () => any;
  }
}

window.snapSaveState = () => getState();

const domNode = document.getElementById("root") as HTMLElement;
const ReactNode = <AppWrapper />;

if (domNode.hasChildNodes()) {
  hydrateRoot(domNode, ReactNode);
} else {
  const root = ReactDOM.createRoot(domNode);
  root.render(ReactNode);
}

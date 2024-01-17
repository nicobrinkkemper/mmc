import ReactDOM, { hydrateRoot } from "react-dom/client";
import { AppWrapper } from "./AppWrapper";
import "./index.css";

const domNode = document.getElementById("root") as HTMLElement;

if (domNode.hasChildNodes()) {
  hydrateRoot(domNode, <AppWrapper />);
} else {
  const root = ReactDOM.createRoot(domNode);
  root.render(<AppWrapper />);
}

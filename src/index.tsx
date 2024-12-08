import ReactDOM, { hydrateRoot } from "react-dom/client";
import { AppWrapper } from "./AppWrapper";
import "./index.css";

// JSDOM Polyfill
const w = window as any;
if (w.reactSnapshotRender) {
  if (typeof window !== 'undefined') {
    if (!window.requestAnimationFrame) window.requestAnimationFrame = cb => setTimeout(cb, 0);
    if (!window.scrollTo) window.scrollTo = function () { };
  }
  if (typeof HTMLElement !== 'undefined') {
    if (!HTMLElement.prototype.scrollTo) HTMLElement.prototype.scrollTo = function () { };
  }
  console.log(`ℹ️ User Agent: ${navigator.userAgent}`)
}

const domNode = document.getElementById("root") as HTMLElement;

if (domNode.hasChildNodes() && !w.reactSnapshotRender) {
  hydrateRoot(domNode, <AppWrapper />);
} else {
  const root = ReactDOM.createRoot(domNode);
  root.render(<AppWrapper />);
  if (w.reactSnapshotRender) {
    w.reactSnapshotRender(root, domNode);
  }
}

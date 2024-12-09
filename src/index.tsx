import { createRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { AppWrapper } from "./AppWrapper";
import "./index.css";

const domNode = document.getElementById("root");

if (!domNode) {
  throw new Error("Failed to find root element");
}

if (typeof window !== 'undefined' && (window as any).reactSnapshotRender) {
  const html = renderToString(<AppWrapper />);
  domNode.innerHTML = html;
  (window as any).reactSnapshotRender();
} else {
  const root = createRoot(domNode);
  root.render(<AppWrapper />);
}

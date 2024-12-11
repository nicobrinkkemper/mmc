import { createRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { AppWrapper } from "./AppWrapper";
import "./index.css";

  const domNode = document.getElementById("root");

  if (!domNode) {
    throw new Error("Failed to find root element");
  }

// For development with Vite
if (import.meta.env.DEV) {
  const root = createRoot(domNode);
  root.render(<AppWrapper />);
} else if (typeof window !== 'undefined' && (window as any).reactSnapshotRender) {
  console.log('[SSG] Starting SSG render process');
  let snapshotCalled = false;

  // For production with SSG
  const html = renderToString(<AppWrapper />);
  domNode.innerHTML = html;
  console.log('[SSG] Initial render complete');

  // Create a root for hydration
  const root = createRoot(domNode);

  // Override reactSnapshotRender to track when it's called
  const originalSnapshotRender = (window as any).reactSnapshotRender;
  (window as any).reactSnapshotRender = () => {
    console.log('[SSG] reactSnapshotRender called');
    snapshotCalled = true;
    originalSnapshotRender();
  };

  // Wait for hydration to complete
  const hydrateComplete = new Promise<void>(resolve => {
    let attempts = 0;
    const maxAttempts = 100; // 10 seconds worth of checks

    console.log('[SSG] Starting hydration');
    root.render(<AppWrapper />);

    const initialContent = domNode.innerHTML;
    const checkContent = () => {
      attempts++;
      const currentContent = domNode.innerHTML;
      console.log(`[SSG] Hydration check ${attempts}/${maxAttempts}`);

      if (currentContent !== initialContent || attempts >= maxAttempts) {
        console.log('[SSG] Hydration complete or max attempts reached');
        resolve();
      } else {
        setTimeout(checkContent, 100); // Check every 100ms
      }
    };

    checkContent();
  });

  // Wait for all assets to load
  const assetsLoaded = new Promise<void>(resolve => {
    const check = () => {
      const allLoaded = Array.from(document.getElementsByTagName('script'))
        .every(script => !script.src || script.hasAttribute('data-loaded'));

      console.log('[SSG] Checking assets loaded:', allLoaded);

      if (allLoaded) {
        console.log('[SSG] All assets loaded');
        resolve();
      } else {
        setTimeout(check, 100);
      }
    };

    document.querySelectorAll('script[src]').forEach(script => {
      script.addEventListener('load', () => script.setAttribute('data-loaded', ''));
    });

    check();
  });

  // Call snapshot render when everything is ready
  Promise.all([hydrateComplete, assetsLoaded])
    .then(() => {
      if (!snapshotCalled) {
        console.log('[SSG] Calling reactSnapshotRender');
        (window as any).reactSnapshotRender();
      } else {
        console.log('[SSG] reactSnapshotRender was already called');
      }
    })
    .catch(err => {
      console.error('[SSG] Error during render:', err);
    });
} else {
  const root = createRoot(domNode);
  root.render(<AppWrapper />);
}

// For Vite HMR
if (import.meta.hot) {
  import.meta.hot.accept();
}


import classNames from "classnames";
import { CSSProperties, useEffect, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes, useLocation } from "react-router-dom";
import { ErrorFallback } from "./ErrorFallback.js";
import styles from "./App.module.css";
import { useCss } from "./css/useCss.js";
import { CreditPage } from "./page/CreditsPage/CreditsPage.js";
import { HomePage } from "./page/HomePage/HomePage.js";
import { LevelBatchPage } from "./page/LevelBatchPage/LevelBatchPage.js";
import { BatchesPage } from "./page/LevelBatchesPage/LevelBatchesPage.js";
import { LevelPage } from "./page/LevelPage/LevelPage.js";
import { NotFoundPage } from "./page/NotFoundPage/NotFoundPage.js";

const isServer = typeof window === 'undefined';

export const App = () => {
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip scroll behavior during SSR
    if (!isServer) {
      ref.current?.scrollTo(0, 0);
    }
  }, [location.pathname]);

  const Theme = useCss("Theme");
  const showAbout = location.hash === "#!/about";
  const style: CSSProperties = !isServer ? (
    showAbout ? { overflowY: "hidden" } : { overflowY: "scroll" }
  ) : {};

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className={classNames(styles.App, Theme)} ref={ref} style={style}>
        <Routes>
          <Route path={`/level/:batchNumber/:order`} element={<LevelPage />} />
          <Route path={`/levels/:batchNumber`} element={<LevelBatchPage />} />
          <Route path={`/levels`} element={<BatchesPage />} />
          <Route path={`/credits`} element={<CreditPage />} />
          <Route path={`/404.html`} element={<NotFoundPage />} />
          <Route path={`/`} index element={<HomePage />} />
          <Route path={`*`} element={<NotFoundPage />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
};

import classNames from "classnames";
import { CSSProperties, useEffect, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes, useLocation } from "react-router-dom";
import styles from "./App.module.css";
import { ErrorFallback } from "./ErrorFallback";
import { useCss } from "./css/useCss";
import { CreditPage } from "./page/CreditsPage/CreditsPage";
import { HomePage } from "./page/HomePage/HomePage";
import { LevelBatchPage } from "./page/LevelBatchPage/LevelBatchPage";
import { BatchesPage } from "./page/LevelBatchesPage/LevelBatchesPage";
import { LevelPage } from "./page/LevelPage/LevelPage";
import { NotFoundPage } from "./page/NotFoundPage/NotFoundPage";

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

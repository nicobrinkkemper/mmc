import styles from "./App.module.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { CreditPage } from "./page/CreditsPage/CreditsPage";
import { HomePage } from "./page/HomePage/HomePage";
import { useCss } from "./css/useCss";
import { LevelBatchPage } from "./page/LevelBatchPage/LevelBatchPage";
import { NotFoundPage } from "./page/NotFoundPage/NotFoundPage";
import { BatchesPage } from "./page/LevelBatchesPage/LevelBatchesPage";
import { LevelPage } from "./page/LevelPage/LevelPage";
import classNames from "classnames";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";
import { useEffect, useRef } from "react";

export const App = () => {
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo(0, 0);
  }, [location.pathname]);

  const Theme = useCss("Theme");
  const showAbout = location.hash === "#!/about";
  const style = showAbout
    ? ({ overflowY: "hidden" } as const)
    : ({ overflowY: "scroll" } as const);
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

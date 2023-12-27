import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { CreditPage } from "./pages/CreditsPage/CreditsPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { useCss } from "./css/useCss";
import { LevelBatchPage } from "./pages/LevelBatchPage/LevelBatchPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { BatchesPage } from "./pages/LevelBatchesPage/LevelBatchesPage";
import { LevelPage } from "./pages/LevelPage/LevelPage";
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
      <div className={classNames("App", Theme)} ref={ref} style={style}>
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

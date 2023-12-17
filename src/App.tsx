import "./App.css";
import { About } from "./about/About";
import { Route, Routes, useLocation } from "react-router-dom";
import { CreditPage } from "./pages/CreditsPage/CreditsPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { useCss } from "./css/useCss";
import { LevelBatchPage } from "./pages/LevelBatchPage/LevelBatchPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { BatchesPage } from "./pages/LevelBatchesPage/LevelBatchesPage";
import { LevelPage } from "./pages/LevelPage/LevelPage";
import { Footer } from "./Footer";
import classNames from "classnames";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path={`/level/:batchNumber/:order`} element={<LevelPage />} />
      <Route path={`/levels/:batchNumber`} element={<LevelBatchPage />} />
      <Route path={`/levels`} element={<BatchesPage />} />
      <Route path={`/credits`} element={<CreditPage />} />
      <Route path={`/`} index element={<HomePage />} />
      <Route path={`*`} element={<NotFoundPage />} />
    </Routes>
  );
};

export const App = () => {
  const location = useLocation();
  const Theme = useCss("Theme");
  const showAbout = location.hash === "#!/about";
  const style = showAbout
    ? ({ overflowY: "hidden", maxHeight: "100vh" } as const)
    : {};
  return (
    <div className={classNames("App", Theme)} style={style}>
      <AppRoutes />
      <About />
      <Footer />
    </div>
  );
};

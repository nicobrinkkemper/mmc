import "./App.css";
import { About } from "./About";
import { Teaser } from "./Teaser";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { useLevelData } from "./useLevelData";
import { Credits } from "./Credits";
import { Level } from "./Level";
import { Batches } from "./Batches";
import { Batch } from "./Batch";
import { Seo } from "./Seo";
import { DEFAULT_DESCRIPTION } from "./constants";
import { NotFound } from "./NotFound";
import { WeekTrailer } from "./WeekTrailer";
import { AboutButton } from "./AboutButton";
import { BackButton } from "./BackButton";
import { WelcomeContent } from "./content/WelcomeContent";
import { useTheme } from "./theme/useTheme";

const CountdownApp = () => {
  return (<Routes>
    <Route path="/credits" element={<CreditPage />} />
    <Route index element={<CountdownPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>)
}

const MainApp = () => {

  return <Routes>
    <Route path={`/level/:batchNumber/:order`} element={<LevelPage />} />
    <Route path={`/levels/:batchNumber`} element={<BatchPage />} />
    <Route path={`/levels`} element={<LevelsPage />} />
    <Route path={`/credits`} element={<CreditPage />} />
    <Route path={`/`} index element={<HomePage />} />
    <Route path={`*`} element={<NotFoundPage />} />
  </Routes>
}

const CreditPage = () => (
  <>
    <header className="App-header">
      <div className="toolbar big">
        <Logo logo="logo_special" />
        <AboutButton />
      </div>
      <BackButton />
    </header>
    <article className="App-body creditsPage">
      <Credits />
    </article>
  </>
);
const CountdownPage = () => {
  const levelData = useLevelData();
  const { info: { caps } } = useTheme();
  return (
    <>
      <header className="App-header">
        <div className="toolbar small">
          <Logo small logo="logo" />
          <AboutButton />
        </div>
      </header>
      <article className="App-body countdownPage">
        <Teaser />
      </article>
      <Seo
        description={`${DEFAULT_DESCRIPTION}. We will start ${levelData.startDate.toDateString()}`}
        title={`${caps} | We are getting ready`}
      />
    </>
  );
}
const LevelPage = () => (
  <>
    <header className="App-header">
      <div className="toolbar small">
        <Logo small logo="logo_simple" />
        <AboutButton />
      </div>
      <BackButton />
    </header>
    <article className="App-body levelPage">
      <Level />
    </article>
  </>
)
const BatchPage = () => (
  <>
    <header className="App-header">
      <div className="toolbar small">
        <Logo logo="logo_simple" small />
        <AboutButton />
      </div>
      <WeekTrailer />
      <BackButton />
    </header>
    <article className="App-body BatchPage">
      <Batch />
    </article>
  </>
)
const LevelsPage = () => (
  <>
    <header className="App-header">
      <div className="toolbar big">
        <Logo logo="logo" />
        <AboutButton />
      </div>
      <BackButton />
    </header>
    <article className="App-body levelsPage">
      <Batches />
    </article>
  </>
)
const HomePage = () => {
  const { info: { caps } } = useTheme();
  return (
    <>
      <header className="App-header">
        <div className="toolbar big">
          <Logo logo="logo_special" />
          <AboutButton />
        </div>
      </header>
      <article className="App-body homePage">
        <WelcomeContent />
        <Seo title={`${caps} | ${DEFAULT_DESCRIPTION}`} />
      </article>
    </>
  )
}
const NotFoundPage = () => (
  <>
    <header className="App-header">
      <div className="toolbar big">
        <Logo />
      </div>
    </header>
    <article className="App-body notFoundPage">
      <NotFound />
    </article>
  </>
)
const App = () => {
  const location = useLocation();
  const { startDate } = useLevelData();
  const { themeSlug } = useTheme();
  const showAbout = location.hash === "#!/about";
  const style = showAbout ? { overflowY: "hidden", maxHeight: "100vh" } as const : {};
  return (
    <div
      className="App"
      style={style}
    >

      {startDate.getTime() >= Date.now() ? <CountdownApp /> : <MainApp />}
      <About />
      <footer className="App-footer">
        <a
          href="https://discord.gg/8mnW3XfZq9"
          rel="noopener noreferrer"
          target="_BLANK"
        >
          Discord
        </a>
        <a
          href="https://www.youtube.com/channel/UClayAs7TxVjMbzBLxBbqyoQ"
          rel="noopener noreferrer"
          target="_BLANK"
        >
          Youtube
        </a>
        <Link relative={'route'} to={`/${themeSlug}credits/`}>Credits</Link>
      </footer>
    </div>
  );
};

export default App;

export { App };

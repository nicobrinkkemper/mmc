import { About } from "../about/About.js";
import { AboutButton } from "../about/AboutButton.js";
import { Content } from "../copy/Content.js";
import { Footer } from "./Footer.js";
import { Logo } from "./Logo.js";

type LayoutComponent = ThemeComponent<{
  images: ["logo"];
  info: ["caps", "snake", "writtenOut"];
  pathInfo: ["theme", "toHome", "toCredits", "toAbout"];
  accordion: true;
  adjacent: {
    pathInfo: ["to"];
    images: ["logo"];
  };
  small: true;
  clickable: true;
}>;

export const Layout: LayoutComponent = ({
  children,
  className,
  small,
  images,
  info,
  pathInfo,
  accordion,
  adjacent,
  clickable,
}) => {
  const { theme, toAbout } = pathInfo;
  return (
    <>
      <AboutButton
        clickable={clickable}
        pathInfo={{ toAbout }}
        key="about-button"
      />
      <Logo
        small={small}
        pathInfo={pathInfo}
        images={images}
        adjacent={adjacent}
        clickable={clickable}
        key="logo"
      />
      <article className={className} key="article">
        {children}
      </article>
      {/**
       * The modal is always rendered and revealed by CSS `:target` (it carries
       * `id="!/about"`, and the button links to `#!/about`), so it opens and
       * closes on the static page — no hydration required.
       *
       * Closing is a bare `#`: it clears the fragment in one same-document
       * navigation, whatever the page's path. Linking back to the path instead
       * would have to match the served URL exactly, trailing slash included —
       * `pathInfo.to` is `/10mmc` while the page is served at `/10mmc/`, and on
       * that mismatch the client router treats the click as a route change and
       * calls `history.pushState`, which does NOT recompute `:target`. The URL
       * loses its fragment but the modal stays latched open.
       *
       * `AboutButton` and `About` are positioned by their own CSS, so their
       * order here does not matter.
       */}
      <About clickable={clickable} closeProps={{ href: "#" }} key="about">
        <Content.About pathInfo={{ theme }} info={info} {...accordion} />
      </About>
      <Footer pathInfo={pathInfo} key="footer" clickable={clickable} />
    </>
  );
};

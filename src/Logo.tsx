import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./theme/useTheme";
import classNames from "classnames";
import { PublicImage } from "./PublicImage";
import { BASE_URL } from "./constants";
import mmc7 from "./data/public/7mmc/images.json";
import mmc8 from "./data/public/8mmc/images.json";

type logoImageTypes = 'logo' | 'logo_simple' | 'logo_special' | 'logo_small';
const logos = {
  '7mmc': mmc7 as Pick<typeof mmc7, logoImageTypes>,
  '8mmc': mmc8 as Pick<typeof mmc8, 'logo' | 'logo_small'>
} as const;


export type LogoProps = PropsWithChildren<{
  logo?: keyof typeof logos['7mmc'];
  small?: boolean;
}>;

const ArrowLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
    className="feather feather-arrow-left" viewBox="0 0 24 24">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);
const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
    className="feather feather-arrow-right" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const Logo = ({ logo = "logo", small = false }: LogoProps) => {
  const endsWithSmall = logo.endsWith('_small')
  if (small && !endsWithSmall) logo = logo + '_small'
  if (endsWithSmall) small = true

  const { theme, themeSlug, info: { nextTheme, prevTheme, caps } } = useTheme();

  let stripBase = window.location.pathname;
  if (stripBase.startsWith(BASE_URL)) stripBase = stripBase.slice(BASE_URL.length);
  if (stripBase.startsWith('/')) stripBase = stripBase.slice(1);
  if (stripBase.startsWith(theme)) stripBase = stripBase.slice(theme.length);
  if (stripBase.startsWith('/')) stripBase = stripBase.slice(1);

  const nextThemeUrl = nextTheme + '/' + stripBase;
  const prevThemeUrl = prevTheme + '/' + stripBase;
  const themeLogos = logos[theme];
  const fallbackType = ((logo in themeLogos) ? logo : 'logo' + (small ? '_small' : '')) as keyof typeof themeLogos

  return (
    <>
      {!small ? <Link to={`/${prevThemeUrl}`}><ArrowLeft /></Link> : null}
      <div className={classNames('Logo', small ? 'small' : 'normal')}>
        <Link to={`/${themeSlug}`}>
          <span className={logo}>
            <PublicImage alt={`${caps} Logo`} {...themeLogos[fallbackType]} />
          </span>
        </Link>
      </div>
      {!small ? <Link to={`/${nextThemeUrl}`}><ArrowRight /></Link > : null}
    </>
  );
};
export { Logo };
export default Logo;

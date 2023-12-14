import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./theme/useTheme";
import classNames from "classnames";
import { PublicImage } from "./PublicImage";
import { BASE_URL } from "./constants";
import mmc7logos from "./data/public/7mmc/images.json";
import mmc8logos from "./data/public/8mmc/images.json";
const logos = {
  '7mmc': {
    logo_small: <PublicImage {...mmc7logos['logo_simple']} height={60} name={'logo_simple'} type={'logo_small'} />,
    logo: <PublicImage {...mmc7logos['logo']} height={200} name={'logo_simple'} type={'logo'} />,
    logo_special: <PublicImage {...mmc7logos['logo_special']} height={200} name={'logo_special'} type={'logo'} />
  },
  '8mmc': {
    logo_small: <PublicImage name={'logo'} height={60} type={'logo_small'} {...mmc8logos['logo']} />,
    logo: <PublicImage name={'logo'} height={200} type={'logo'} {...mmc8logos['logo']} />,
    logo_special: <PublicImage name={'logo'} height={200} type={'logo'} {...mmc8logos['logo']} />
  }
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
  if (small) logo = 'logo_small'
  if (logo === 'logo_small') small = true;
  const { theme, themeSlug, info: { nextTheme, prevTheme } } = useTheme();
  let stripBase = window.location.pathname;
  if (stripBase.startsWith(BASE_URL)) stripBase = stripBase.slice(BASE_URL.length);
  if (stripBase.startsWith('/')) stripBase = stripBase.slice(1);
  if (stripBase.startsWith(theme)) stripBase = stripBase.slice(theme.length);
  if (stripBase.startsWith('/')) stripBase = stripBase.slice(1);
  const nextThemeUrl = nextTheme + '/' + stripBase;
  const prevThemeUrl = prevTheme + '/' + stripBase;
  return (
    <>
      {!small ? <Link to={`/${prevThemeUrl}`}><ArrowLeft /></Link> : null}
      <div className={classNames('Logo', small ? 'small' : 'normal')}>
        <Link to={`/${themeSlug}`}>
          <span className={classNames(logo)}>{logos[theme][logo]}</span>
        </Link>
      </div>
      {!small ? <Link to={`/${nextThemeUrl}`}><ArrowRight /></Link > : null}
    </>
  );
};
export { Logo };
export default Logo;

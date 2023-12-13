import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./theme/useTheme";
import classNames from "classnames";
import { PublicImage } from "./PublicImage";
const logos = {
  '7mmc': {
    logo_small: <PublicImage name={'logo_simple'} type={'logo_small'} />,
    logo: <PublicImage name={'logo_simple'} type={'logo'} />,
    logo_special: <PublicImage name={'logo_special'} type={'logo'} />
  },
  '8mmc': {
    logo_small: <PublicImage name={'logo'} type={'logo_small'} />,
    logo: <PublicImage name={'logo'} type={'logo'} />,
    logo_special: <PublicImage name={'logo'} type={'logo'} />
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
  const { theme, themeSlug, locationWithoutTheme, info: { nextTheme, prevTheme } } = useTheme();
  return (
    <>
      {!small ? <Link to={'/' + prevTheme + locationWithoutTheme}><ArrowLeft /></Link> : null}
      <div className={classNames('Logo', small ? 'small' : 'normal')}>
        <Link to={`${themeSlug}`}>
          <span className={classNames(logo)}>{logos[theme][logo]}</span>
        </Link>
      </div>
      {!small ? <Link to={'/' + nextTheme + locationWithoutTheme}><ArrowRight /></Link > : null}
    </>
  );
};
export { Logo };
export default Logo;

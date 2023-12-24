import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../theme/useTheme";
import classNames from "classnames";
import { PublicImage } from "../components/PublicImage";

type logoImageTypes = 'logo' | 'logo_simple' | 'logo_special' | 'logo_small';



export type LogoProps = PropsWithChildren<{
  logo?: logoImageTypes;
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

export const Logo = ({ logo = "logo", small = false }: LogoProps) => {
  const endsWithSmall = logo.endsWith('_small')
  if (small && !endsWithSmall) logo = logo + '_small'
  if (endsWithSmall) small = true
  const { themeSlug, data, info: { nextThemeUrl, prevThemeUrl, caps } } = useTheme();
  const fallbackType = ((logo in data) ? logo : 'logo' + (small ? '_small' : '')) as 'logo'
  return (
    <>
      {!small ? <Link to={`/${prevThemeUrl}`}><ArrowLeft /></Link> : null}
      <div className={classNames('Logo', small ? 'small' : 'normal')}>
        <Link to={`/${themeSlug}`}>
          <span className={logo}>
            <PublicImage alt={`${caps} Logo`} {...data.images[fallbackType]} />
          </span>
        </Link>
      </div>
      {!small ? <Link to={`/${nextThemeUrl}`}><ArrowRight /></Link > : null}
    </>
  );
};

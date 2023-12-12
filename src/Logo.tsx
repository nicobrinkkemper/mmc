import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import mmc8Logo1x from "./assets/8mmc_logo1x.webp";
import mmc8Logo2x from "./assets/8mmc_logo2x.webp";
import mmc8Logo3x from "./assets/8mmc_logo3x.webp";
import mmc7Logo1x from "./assets/7mmc_logo_simple1x.webp";
import mmc7Logo2x from "./assets/7mmc_logo_simple2x.webp";
import mmc7Logo3x from "./assets/7mmc_logo_simple3x.webp";
import mmc7SpecialLogo1x from "./assets/7mmc_logo_special1x.webp";
import mmc7SpecialLogo2x from "./assets/7mmc_logo_special2x.webp";
import mmc7SpecialLogo3x from "./assets/7mmc_logo_special3x.webp";
import { useTheme } from "./theme/useTheme";
import classNames from "classnames";
const logos = {
  '7mmc': {
    logo: (
      <picture className="Picture">
        <source srcSet={`${mmc7Logo1x} 272w, ${mmc7Logo2x} 328w, ${mmc7Logo3x} 1096w`} />
        <img src={mmc7Logo1x} className="Logo-img" alt="logo" width="100%" height='auto' />
      </picture>
    ),
    logo_special: (
      <picture className="Picture">
        <source srcSet={`${mmc7SpecialLogo1x} 272w,${mmc7SpecialLogo2x} 528w, ${mmc7SpecialLogo3x} 1096w`} />
        <img src={mmc7SpecialLogo1x} className="Logo-img" alt="logo" width="100%" height='auto' />
      </picture>
    )
  },
  '8mmc': {
    logo: (
      <picture className="Picture">
        <source srcSet={`${mmc8Logo1x} 272w,${mmc8Logo2x} 528w, ${mmc8Logo3x} 1096w`} />
        <img src={mmc8Logo1x} className="Logo-img" alt="logo" width="100%" height='auto' />
      </picture>
    ),
    logo_special: (
      <picture className="Picture">
        <source srcSet={`${mmc8Logo1x} 272w,${mmc8Logo2x} 528w, ${mmc8Logo3x} 1096w`} />
        <img src={mmc8Logo1x} className="Logo-img" alt="logo" width="100%" height='auto' />
      </picture>
    )
  }
} as const;

export type LogoProps = PropsWithChildren<{
  logo?: 'logo' | 'logo_special';
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

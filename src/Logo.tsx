import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import logo1x from "./assets/logo_simple1x.webp";
import logo2x from "./assets/logo_simple2x.webp";
import logo3x from "./assets/logo_simple3x.webp";
import simpleLogo1x from "./assets/logo_special1x.webp";
import simpleLogo2x from "./assets/logo_special2x.webp";
import simpleLogo3x from "./assets/logo_special3x.webp";
const logos = {
  logo: (
    <picture className="Picture">
      <source srcSet={`${logo1x} 272w,${logo2x} 528w, ${logo3x} 1096w`} />
      <img src={logo1x} className="Picture-img" alt="logo" width="100%" height='auto' />
    </picture>
  ),
  logo_special: (
    <picture className="Picture">
      <source srcSet={`${simpleLogo1x} 272w,${simpleLogo2x} 528w, ${simpleLogo3x} 1096w`} />
      <img src={simpleLogo1x} className="Picture-img" alt="logo" width="100%" height='auto' />
    </picture>
  )
};

export type LogoProps = PropsWithChildren<{
  logo?: keyof typeof logos;
  small?: boolean;
}>;

const createPicture = (logo: keyof typeof logos) => {
  return () => (
    <span className={["Picture", logo].join(" ")}>{logos[logo]}</span>
  );
};

const Logo = ({ logo = "logo", small = false }: LogoProps) => {
  const classes = ["Logo"];
  const Picture = createPicture(logo);
  if (small) classes.push("small");
  return (
    <div className={classes.join(" ")}>
      <Link to="/">
        <Picture />
      </Link>
    </div>
  );
};
export { Logo };
export default Logo;

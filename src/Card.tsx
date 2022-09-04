import { PropsWithChildren } from "react";
import { Link, To } from "react-router-dom";
import carcTexture1x from "./assets/card_texture1x.webp";
import carcTexture2x from "./assets/card_texture2x.webp";
import carcTexture3x from "./assets/card_texture3x.webp";

const illustrations = {
  cake_mario: (
    <picture className="Illustration-picture">
      <source
        srcSet={`${carcTexture1x} 140w, ${carcTexture2x} 280w, ${carcTexture3x} 560w`}
      />
      <img
        src={carcTexture1x}
        className="Illustration-img"
        alt="Mario wants CAKE!"
        width="100%"
      />
    </picture>
  ),
};

type allowedIllustration = keyof typeof illustrations;
export type CardProps = PropsWithChildren<{
  illustration?: allowedIllustration;
  disabled?: boolean;
  to?: To;
  className?: string;
}>;

const createIllustration = (illustration: allowedIllustration) => {
  return () => (
    <span className={["Illustration", illustration].join(" ")}>
      {illustrations[illustration]}
    </span>
  );
};

function hasIllustration(
  key?: allowedIllustration
): key is allowedIllustration {
  return Boolean(
    typeof key === "string" && typeof illustrations[key] === "object"
  );
}

const WrapLink = ({ children, to, disabled }: CardProps) => {
  if (typeof to === "undefined" || disabled) return <>{children}</>;
  else
    return (
      <Link to={to} className="Clickable">
        {children}
      </Link>
    );
};

const Card = ({ children, illustration, disabled = false, to, className }: CardProps) => {
  const classes = ["Card", illustration];
  if (className) classes.push(className);
  if (hasIllustration(illustration)) classes.push("hasIllustration");
  if (disabled) classes.push("disabled");
  const isClickable = typeof to === "string";
  if (isClickable) classes.push("isClickable");
  const Illustration = hasIllustration(illustration)
    ? createIllustration(illustration)
    : () => null;
  return (
    <div className={classes.join(" ")}>
      <WrapLink to={to} disabled={disabled}>
        <Illustration />
        <div className="Card-content">{children}</div>
      </WrapLink>
    </div>
  );
};

export default Card;
export { Card };

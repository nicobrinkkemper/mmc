import { PropsWithChildren } from "react";
import { Link, To } from "react-router-dom";
import cardTexture1x from "./assets/card_texture1x.webp";
import junior1x from "./assets/junior1x.webp";
import junior2x from "./assets/junior2x.webp";
import junior3x from "./assets/junior3x.webp";
import map1x from "./assets/map1x.webp";
import map2x from "./assets/map2x.webp";
import map3x from "./assets/map3x.webp";

const illustrations = {
  junior: (
    <picture className="Illustration-picture">
      <source
        srcSet={`${junior1x} 140w, ${junior2x} 280w, ${junior3x} 560w`}
      />
      <img
        src={cardTexture1x}
        className="Illustration-img"
        alt="Drawing by Lektor Junior!"
        width="100%"
      />
    </picture>
  ),
  map : (
    <picture className="Illustration-picture">
      <source
        srcSet={`${map1x} 140w, ${map2x} 280w, ${map3x} 560w`}
      />
      <img
        src={cardTexture1x}
        className="Illustration-img"
        alt="A map!"
        width="100%"
      />
    </picture>
  )
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

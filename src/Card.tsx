
import { PropsWithChildren } from "react";
import { Link, To } from "react-router-dom";
import map from "./assets/7mmc_map1x.webp";
import marioBed from "./assets/8mmc_mario_bed.webp";
import classnames from "classnames";
import { useTheme } from "./theme/useTheme";
import { Theme } from "./theme/ThemeContext";
const illustrations = {
  '7mmc': {
    card: (
      <picture className="Illustration-picture">
        <img
          src={map}
          className="Illustration-img"
          alt="A map!"
          width="100%"
        />
      </picture>
    )
  },
  '8mmc': {
    card: (
      <picture className="Illustration-picture">
        <img
          src={marioBed}
          className="Illustration-img"
          alt="Wake up Mario!"
          width="100%"
        />
      </picture>
    )
  },

};

export type CardProps = PropsWithChildren<{
  illustration?: keyof typeof illustrations[Theme];
  disabled?: boolean;
  to?: To;
  className?: string;
}>;

function hasIllustration(
  theme: Theme,
  key?: keyof typeof illustrations[Theme]
): key is Exclude<typeof key, undefined> {
  return Boolean(
    typeof key === "string" && typeof illustrations[theme][key] === "object"
  );
}

const WrapLink = ({ children, to, disabled, illustration, className }: CardProps) => {
  if (typeof to === "undefined" || disabled) return <>{children}</>;
  else
    return (
      <Link to={to} className={classnames("Clickable", illustration, className)}>
        {children}
      </Link>
    );
};

const Card = ({ children, illustration, disabled = false, to, className }: CardProps) => {
  const classes = ["Card", illustration];
  const { theme } = useTheme();
  const hasExtra = hasIllustration(theme, illustration);
  if (className) classes.push(className);
  if (hasExtra) classes.push("hasIllustration");
  if (disabled) classes.push("disabled");
  if (typeof to === "string") classes.push("isClickable");
  return (
    <div className={classnames(classes)}>
      <WrapLink to={to} disabled={disabled}>
        {hasExtra && <span className={classnames("Illustration", illustration)}>
          {illustrations[theme][illustration]}
        </span>}
        <div className="Card-content">{children}</div>
      </WrapLink>
    </div>
  );
};

export default Card;
export { Card };

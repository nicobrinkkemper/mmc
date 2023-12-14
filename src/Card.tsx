
import { PropsWithChildren } from "react";
import { Link, To } from "react-router-dom";
import classnames from "classnames";
import { useTheme } from "./theme/useTheme";
import { Theme } from "./theme/ThemeContext";
import { PublicImage } from "./PublicImage";
import mmc7illustrations from "./data/public/7mmc/images.json";
import mmc8illustrations from "./data/public/8mmc/images.json";

const illustrations = {
  '7mmc': {
    card: (
      <PublicImage alt={'A treasure map!'} type={'illustration'} {...mmc7illustrations['illustration']} />
    )
  },
  '8mmc': {
    card: (
      <PublicImage alt={'Mario wakes up'} type={'illustration'} {...mmc8illustrations['illustration']} />
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

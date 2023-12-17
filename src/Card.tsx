
import React, { PropsWithChildren } from "react";
import { Link, To } from "react-router-dom";
import classnames from "classnames";
import { useTheme } from "./theme/useTheme";
import { Theme } from "./theme/ThemeContext";
import { PublicImage } from "./PublicImage";
import mmc7illustrations from "./data/public/7mmc/images.json";
import mmc8illustrations from "./data/public/8mmc/images.json";

const illustrations = {
  '7mmc': {
    home: (
      <PublicImage alt={'A treasure map!'} height={126} {...mmc7illustrations['illustration']} />
    )
  },
  '8mmc': {
    home: (
      <PublicImage alt={'Mario wakes up'} height={124} {...mmc8illustrations['illustration']} />
    )
  },
};

export type CardProps = PropsWithChildren<{
  illustration?: keyof typeof illustrations[Theme];
  disabled?: boolean;
  to?: To;
  className?: string;
  heading?: React.ReactNode
  subHeading?: React.ReactNode
}>;

function hasIllustration(
  theme: Theme,
  key?: keyof typeof illustrations[Theme]
): key is Exclude<typeof key, undefined> {
  return Boolean(
    typeof key === "string" && typeof illustrations[theme][key] === "object"
  );
}

export const Card = ({ children, illustration, disabled = false, to, className, heading, subHeading }: CardProps) => {
  const classes = ["Card", illustration];
  const { theme } = useTheme();
  const hasExtra = hasIllustration(theme, illustration);
  if (className) classes.push(className);
  if (hasExtra) classes.push("hasIllustration");
  if (disabled) classes.push("disabled");
  if (typeof to === "string") classes.push("isClickable");
  const ContainerOuter: any = to ? Link : heading ? "div" : React.Fragment;
  const ContainerOuterProps = to ? { to, disabled, className: classnames("Clickable", illustration, ...classes) } : {};
  const ContainerInner = !ContainerOuterProps.className ? "div" : React.Fragment;
  const ContainerInnerProps = !ContainerOuterProps.className ? { className: classnames(classes) } : {};
  return (
    <ContainerOuter {...ContainerOuterProps}>
      {heading ?? null}
      <ContainerInner {...ContainerInnerProps}>
        {hasExtra && <span className={classnames("Illustration", illustration)}>
          {illustrations[theme][illustration]}
        </span>}
        {subHeading ?? null}
        {children}
      </ContainerInner>
    </ContainerOuter>
  );
};


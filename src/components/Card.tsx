
import React, { PropsWithChildren } from "react";
import { Link, To } from "react-router-dom";
import classnames from "classnames";
import { useTheme } from "../theme/useTheme";
import { PublicImage } from "./PublicImage";

export type CardProps = PropsWithChildren<{
  illustration?: boolean
  disabled?: boolean;
  to?: To;
  className?: string;
  heading?: React.ReactNode
  subHeading?: React.ReactNode
}>;


export const Card = ({ children, illustration, disabled = false, to, className, heading, subHeading }: CardProps) => {
  const classes = ["Card", illustration];
  const { data } = useTheme();
  if (className) classes.push(className);
  if (illustration) classes.push("hasIllustration");
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
        {illustration && <span className={classnames("Illustration", illustration)}>
          <PublicImage alt={'illustration'} {...data.images.illustration} />
        </span>}
        {subHeading ?? null}
        {children}
      </ContainerInner>
    </ContainerOuter>
  );
};


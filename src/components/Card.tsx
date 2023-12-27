
import React, { PropsWithChildren } from "react";
import { Link, To } from "react-router-dom";
import classnames from "classnames";
import { useTheme } from "../theme/useTheme";
import { PublicImage } from "./PublicImage";
import styles from "./Card.module.css";

export type CardProps = PropsWithChildren<{
  illustration?: boolean
  disabled?: boolean;
  to?: To;
  className?: string;
  heading?: React.ReactNode | string
  subHeading?: React.ReactNode | string
  type?: 'special' | 'simple'
}>;

export const Card = ({ children, illustration, disabled = false, to, type = 'simple', className, heading, subHeading }: CardProps) => {
  const classes = [styles.Card, illustration];
  const { data } = useTheme();
  if (className) classes.push(className);
  if (illustration) {
    if (type === 'special') classes.push(styles.HasSpecialCardIllustration);
    classes.push(styles.HasCardIllustration);
  }
  if (disabled) classes.push(styles.CardDisabled);
  if (typeof to === "string") classes.push(styles.IsClickableCard);
  const OuterContainer = heading ? "div" : React.Fragment;
  const OuterContainerProps = heading ? { className: classnames(styles.CardOuter) } : {};
  const ClickableContainer: any = to ? Link : heading ? "div" : React.Fragment;
  const ClickableContainerProps = to ? { to, disabled, className: classnames(illustration, ...classes) } : {};
  const ContainerInner = !ClickableContainerProps.className ? "div" : React.Fragment;
  const ContainerInnerProps = !ClickableContainerProps.className ? { className: classnames(classes) } : {};
  const headingEl = typeof heading === 'string' ? <h1>{heading}</h1> : heading ?? null;
  const subheadingEl = typeof subHeading === 'string' ? <h2>{subHeading}</h2> : subHeading ?? null;
  return (
    <OuterContainer {...OuterContainerProps}>
      {headingEl}
      <ClickableContainer {...ClickableContainerProps}>
        <ContainerInner {...ContainerInnerProps}>
          {illustration && <span className={classnames(type === 'special' ? styles.SpecialCardIllustration : styles.CardIllustration, illustration)}>
            <PublicImage alt={'illustration'} {...data.images.illustration} />
          </span>}
          {subheadingEl}
          {children}
        </ContainerInner>
      </ClickableContainer>
    </OuterContainer>
  );
};


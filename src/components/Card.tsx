import classnames from "classnames";
import { PropsWithChildren } from "react";
import { Link, To } from "react-router-dom";
import styles from "./Card.module.css";
import { Image } from "./Image";

export type CardProps = PropsWithChildren<{
  illustration?: boolean;
  disabled?: boolean;
  to?: To;
  className?: string;
  heading?: string | JSX.Element;
  subHeading?: string;
  type?: "special" | "simple";
}>;

function CardOuter({
  children,
  heading,
}: Readonly<Pick<CardProps, "heading" | "children">>) {
  if (!heading) return <>{children}</>;
  return (
    <div className={classnames(styles.CardOuter)}>
      <h1>{heading}</h1>
      {children}
    </div>
  );
}

function CardClickable({
  children,
  to,
  disabled,
  className,
}: Readonly<Pick<CardProps, "to" | "children" | "disabled" | "className">>) {
  const names = classnames(styles.CardInner, className);
  if (!to) return <div className={names}>{children}</div>;
  return (
    <Link to={to} aria-disabled={disabled} className={names}>
      {children}
    </Link>
  );
}

function CardIllustration({
  illustration,
  type,
}: Readonly<Pick<CardProps, "illustration" | "type">>) {
  if (!illustration) return null;
  const names = classnames(
    type === "special"
      ? styles.SpecialCardIllustration
      : styles.CardIllustration,
    illustration
  );
  return <Image alt={"illustration"} name="illustration" className={names} />;
}

export const Card = ({
  children,
  illustration,
  disabled = false,
  to,
  type = "simple",
  className,
  heading,
  subHeading,
}: CardProps) => {
  const names = classnames(
    illustration,
    styles.Card,
    illustration,
    className,
    disabled && styles.CardDisabled,
    !!to && styles.CardClickable,
    illustration &&
      (type === "special"
        ? styles.HasSpecialCardIllustration
        : styles.HasCardIllustration)
  );
  return (
    <CardOuter heading={heading}>
      <CardClickable to={to} disabled={disabled} className={names}>
        <CardIllustration illustration={illustration} type={type} />
        <h2>{subHeading}</h2>
        {children}
      </CardClickable>
    </CardOuter>
  );
};

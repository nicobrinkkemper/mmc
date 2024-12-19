import classnames from "classnames";
import * as React from "react";
import { PropsWithChildren } from "react";
import styles from "./Card.module.css";
import { Image } from "./Image.js";

export type CardProps = PropsWithChildren<{
  illustration?: boolean;
  disabled?: boolean;
  href?: string;
  className?: string;
  heading?: string;
  subHeading?: string;
  type?: "special" | "simple";
  images?: Record<string, any>;
  clickable?: React.ElementType;
}>;

function CardOuter({
  children,
  heading,
}: Readonly<Pick<CardProps, "heading" | "children">>) {
  if (!heading) return <>{children}</>;
  return (
    <div className={classnames(styles["CardOuter"])}>
      <h1>{heading}</h1>
      {children}
    </div>
  );
}

function CardInner({
  clickable: Clickable = "a",
  children,
  href,
  disabled,
  className,
}: Readonly<
  Pick<CardProps, "href" | "children" | "disabled" | "className" | "clickable">
>) {
  const names = classnames(styles["CardInner"], className);
  if (!href) return <div className={names}>{children}</div>;
  return (
    <Clickable href={href} to={href} aria-disabled={disabled} className={names}>
      {children}
    </Clickable>
  );
}

function CardIllustration({
  illustration,
  type,
  images,
}: Readonly<Pick<CardProps, "illustration" | "type" | "images">>) {
  if (!illustration) return null;
  const names = classnames(
    type === "special"
      ? styles["SpecialCardIllustration"]
      : styles["CardIllustration"],
    illustration
  );
  return (
    <Image
      alt={"illustration"}
      name="illustration"
      className={names}
      images={images!}
    />
  );
}

export const Card = ({
  children,
  illustration,
  disabled = false,
  href,
  type = "simple",
  className,
  heading,
  subHeading,
  images,
  clickable: Clickable,
}: CardProps) => {
  const names = classnames(
    illustration,
    styles["Card"],
    illustration,
    className,
    disabled && styles["IsCardDisabled"],
    !!href && styles["IsClickableCard"],
    illustration &&
      (type === "special"
        ? styles["HasSpecialCardIllustration"]
        : styles["HasCardIllustration"])
  );
  return (
    <CardOuter heading={heading}>
      <CardInner
        href={href}
        disabled={disabled}
        className={names}
        clickable={Clickable}
      >
        {images ? (
          <CardIllustration
            illustration={illustration}
            type={type}
            images={images}
          />
        ) : null}
        <h2>{subHeading}</h2>
        {children}
      </CardInner>
    </CardOuter>
  );
};

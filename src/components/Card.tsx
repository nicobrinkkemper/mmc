import c from "clsx";
import * as React from "react";
import styles from "./Card.module.css";
import { PublicImage } from "./PublicImage.js";

const CardOuter: ThemeComponent<
  {},
  "div",
  {
    heading: React.ReactNode;
  }
> = ({ heading, children }) => {
  if (!heading) return <>{children}</>;
  return (
    <div className={c(styles["CardOuter"])}>
      {typeof heading === "string" ? <h1>{heading}</h1> : heading}
      {children}
    </div>
  );
};

const CardInner: ThemeComponent<
  {
    clickable: boolean;
  },
  "div",
  {
    to?: string;
  }
> = ({ clickable: Clickable, children, className, to }) => {
  const names = c(styles["CardInner"], className);
  return to && Clickable ? (
    <Clickable href={to} className={names}>
      {children}
    </Clickable>
  ) : (
    <div className={names}>{children}</div>
  );
};

export const Card: ThemeComponent<
  {
    images: ["illustration"] | [];
    clickable: boolean;
  },
  "div",
  {
    to?: string;
    type?: "simple" | "special";
    heading?: string | React.ReactNode;
    subHeading?: string | React.ReactNode;
    disabled?: boolean;
  }
> = ({
  children,
  type = "simple",
  className,
  images,
  clickable,
  heading,
  subHeading,
  disabled,
  to,
}) => {
  const cardIllustration =
    typeof images === "object" && images != null && "illustration" in images
      ? images["illustration"]
      : null;
  const names = c(
    styles["Card"],
    className,
    disabled && styles["IsCardDisabled"],
    !!clickable && styles["IsClickableCard"],
    cardIllustration?.className,
    cardIllustration &&
      (type === "special"
        ? styles["HasSpecialCardIllustration"]
        : styles["HasCardIllustration"])
  );
  return (
    <>
      <CardOuter heading={heading}>
        <CardInner className={names} clickable={clickable} to={to}>
          {cardIllustration ? (
            <PublicImage
              className={c(
                type === "special"
                  ? styles["SpecialCardIllustration"]
                  : styles["CardIllustration"],
                cardIllustration.className
              )}
              src={cardIllustration.src}
              srcSet={cardIllustration.srcSet}
              width={cardIllustration.width}
              height={cardIllustration.height}
            />
          ) : null}
          {typeof subHeading === "string" ? <h2>{subHeading}</h2> : subHeading}
          {children}
        </CardInner>
      </CardOuter>
    </>
  );
};

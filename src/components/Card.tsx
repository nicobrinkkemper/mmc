import classnames from "classnames";
import * as React from "react";
import styles from "./Card.module.css";
import { PublicImage } from "./PublicImage.js";

const CardOuter: ThemeComponent<{
  heading: optional;
}> = ({ heading, children }) => {
  if (!heading) return <>{children}</>;
  return (
    <div className={classnames(styles["CardOuter"])}>
      {typeof heading === "string" ? <h1>{heading}</h1> : heading}
      {children}
    </div>
  );
};

const CardInner: ThemeComponent<{
  clickable: optional;
}> = ({ clickable: Clickable, children, className }) => {
  const names = classnames(styles["CardInner"], className);
  return (
    <div className={names}>
      {Clickable ? (
        <Clickable className={names}>{children}</Clickable>
      ) : (
        children
      )}
    </div>
  );
};

export const Card: ThemeComponent<{
  images: pickOptional<["illustration"]>;
  type: required;
  clickable: optional;
  heading: optional;
  subHeading: optional;
}> = ({
  children,
  type = "simple",
  className,
  images,
  clickable,
  heading,
  subHeading,
}) => {
  const cardIllustration =
    "illustration" in images ? images["illustration"][0] : null;
  const names = classnames(
    styles["Card"],
    className,
    !clickable && styles["IsCardDisabled"],
    !!clickable && styles["IsClickableCard"],
    cardIllustration?.className,
    cardIllustration?.className &&
      (type === "special"
        ? styles["HasSpecialCardIllustration"]
        : styles["HasCardIllustration"])
  );
  return (
    <CardOuter heading={heading}>
      <CardInner className={names} clickable={clickable}>
        {cardIllustration ? (
          <PublicImage
            className={classnames(
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
  );
};

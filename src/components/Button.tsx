import classNames from "classnames";
import * as React from "react";
import styles from "./Button.module.css";
import { ButtonIcons } from "./ButtonIcons.js";

export type ButtonProps = React.PropsWithChildren<
  {
    primary?: boolean;
    inverted?: boolean;
    href?: string;
    to?: string;
    id?: string;
    icon: keyof typeof ButtonIcons;
    iconPosition?: "left" | "right";
    className?: string;
    hidden?: boolean;
  } & Clickable
>;

export const Button = ({
  children,
  primary,
  icon,
  href,
  inverted = false,
  hidden = false,
  iconPosition = "right",
  className,
  id,
  clickable: Clickable = "a",
}: ButtonProps) => {
  const shouldForceBlank =
    typeof href === "string" &&
    (href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("//"));
  const classN = classNames(
    className,
    styles["Button"],
    primary && styles["primary"],
    inverted && styles["inverted"],
    typeof ButtonIcons[icon] === "string" && styles["hasIcon"],
    iconPosition === "left" && styles["iconIsLeft"],
    hidden && styles["hidden"]
  );
  const Icon = (
    <span
      className={classNames(
        styles["ButtonIcon"],
        styles[icon as keyof typeof styles]
      )}
    >
      {ButtonIcons[icon]}
    </span>
  );
  const blankProps = shouldForceBlank
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Clickable href={href} id={id} className={classN} {...blankProps}>
      <div className={styles["ButtonInner"]}>
        {iconPosition === "left" ? Icon : null}
        <span className={styles["ButtonLabel"]}>{children}</span>
        {iconPosition !== "left" ? Icon : null}
      </div>
    </Clickable>
  );
};

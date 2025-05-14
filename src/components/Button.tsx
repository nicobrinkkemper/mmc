import classNames from "clsx";
import React from "react";
import { baseURL } from "../config/env.server.js";
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
  /**
   * Handle special cases for button content
   * @remarks This ensures consistent rendering between server and client
   */
  const buttonChildren = children ? (
    children
  ) : (
    <span className={styles["ButtonLabel"]}>{children}</span>
  );

  /**
   * Check if the link should open in a new tab
   * @remarks Handles external links (http, https, or protocol-relative)
   */
  const shouldForceBlank =
    typeof href === "string" &&
    (href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("//"));

  /**
   * Normalize paths to ensure consistency between server and client
   * @remarks Handles both theme-specific and root paths
   */
  const normalizedHref = href?.startsWith("/")
    ? href
    : href?.includes("mmc")
    ? `/${href}`
    : href;

  const classN = classNames(
    className,
    styles["Button"],
    primary && styles["primary"],
    inverted && styles["inverted"],
    typeof ButtonIcons[icon] === "string" && styles["hasIcon"],
    iconPosition === "left" && styles["iconIsLeft"],
    hidden && styles["hidden"]
  );

  const Icon = ButtonIcons[icon] && (
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
    <Clickable
      href={baseURL(normalizedHref ?? "")}
      id={id}
      className={classN}
      {...blankProps}
    >
      <div className={styles["ButtonInner"]}>
        {iconPosition === "left" && Icon}
        {buttonChildren}
        {iconPosition !== "left" && Icon}
      </div>
    </Clickable>
  );
};

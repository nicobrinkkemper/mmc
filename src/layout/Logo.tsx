import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../theme/useTheme";
import classNames from "classnames";
import styles from "./Logo.module.css";
import { ThemeLogo } from "./ThemeLogo";
type logoImageTypes = "logo" | "logo_simple" | "logo_special" | "logo_small";

export type LogoProps = PropsWithChildren<{
  logo?: logoImageTypes;
  small?: boolean;
  className?: string;
}>;
export const Logo = ({
  logo = "logo",
  small = false,
  className,
}: LogoProps) => {
  const endsWithSmall = logo.endsWith("_small");
  if (small && !endsWithSmall) logo = logo + "_small";
  if (endsWithSmall) small = true;
  const {
    theme,
    themeSlug,
    info: { nextThemeUrl, prevThemeUrl, nextTheme, prevTheme },
  } = useTheme();

  const hasPrev = !small && prevTheme;
  const hasNext = !small && nextTheme;
  const size = small ? "small" : "big";
  return (
    <>
      {hasPrev && <Link to={`/${prevThemeUrl}`}><ThemeLogo theme={prevTheme} small logo="logo_simple" /></Link>}
      <div className={classNames(className, styles.Logo, styles[size])}>
        <Link to={`/${themeSlug}`}>
          <ThemeLogo
            small={small}
            logo={logo}
            className={styles[logo]}
            theme={theme}
          />
        </Link>
      </div>
      {hasNext && <Link to={`/${nextThemeUrl}`}><ThemeLogo theme={nextTheme} small logo="logo_simple" /></Link>}
    </>
  );
};

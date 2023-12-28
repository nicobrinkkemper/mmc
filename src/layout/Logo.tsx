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
      <div className={classNames(className, styles.Logo, styles[size])}>
        <Link to={`/${themeSlug}`}
          className={styles[logo]}>
          <ThemeLogo
            small={small}
            logo={logo}
            theme={theme}
          />
        </Link>
      </div>
      {hasPrev && <Link className={styles.PrevTheme} to={`/${prevThemeUrl}`}><ThemeLogo theme={prevTheme} small logo="logo_simple" /></Link>}
      {hasNext && <Link className={styles.NextTheme} to={`/${nextThemeUrl}`}><ThemeLogo theme={nextTheme} small logo="logo_simple" /></Link>}
    </>
  );
};

import classNames from "classnames";
import { AboutButton } from "../about/AboutButton";
import { BackButton } from "../components/BackButton";
import { Logo } from "./Logo";
import { PropsWithChildren } from "react";
import styles from "./Header.module.css";
type HeaderType = 'special' | 'simple' | 'normal';
export function Header({ type, small, children }: Readonly<PropsWithChildren<{
    type: HeaderType,
    small?: boolean
}>>) {
    const size = small ? 'small' : 'big';
    return (
        <header className={styles.Header}>
            <div className={classNames(styles.Toolbar, styles[size])}>
                <Logo small={small} logo={type === 'normal' ? 'logo' : `logo_${type}`} />
                <AboutButton />
            </div>
            {children}
            <BackButton />
        </header>
    )
}
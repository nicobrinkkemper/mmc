import { AboutButton } from "../../about/AboutButton";
import { BackButton } from "../../BackButton";
import { Logo } from "../../Logo";
import Seo from "../../Seo";
import { DEFAULT_DESCRIPTION } from "../../constants";
import { useTheme } from "../../theme/useTheme";
import styles from "./Credits.module.css";
import { useContent } from "../../content/useContent";

export function CreditPage() {
    const { info: { caps } } = useTheme();
    const CreditsContent = useContent('CreditsContent');
    return (
        <>
            <header className="App-header">
                <div className="toolbar big">
                    <Logo logo="logo_special" />
                    <AboutButton />
                </div>
                <BackButton />
            </header>
            <article className="App-body creditsPage">
                <CreditsContent className={styles.CreditsCard} />
            </article>
            <Seo
                description={`Special thanks to all contributors! ${DEFAULT_DESCRIPTION}`}
                title={`${caps} | Credits | Site by General BB`}
            />
        </>
    );
}
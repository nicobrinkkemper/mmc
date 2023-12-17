import { AboutButton } from "../../about/AboutButton";
import { Logo } from "../../Logo";
import Seo from "../../Seo";
import { DEFAULT_DESCRIPTION } from "../../constants";
import { useTheme } from "../../theme/useTheme";
import { useContent } from "../../content/useContent";

export function HomePage() {
    const { info: { caps } } = useTheme();
    const WelcomeContent = useContent('WelcomeContent');
    return (
        <>
            <header className="App-header">
                <div className="toolbar big">
                    <Logo logo="logo_special" />
                    <AboutButton />
                </div>
            </header>
            <article className="App-body homePage">
                <WelcomeContent />
            </article>
            <Seo title={`${caps} | ${DEFAULT_DESCRIPTION}`} />
        </>
    )
}
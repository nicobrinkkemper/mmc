import { AboutButton } from "../../about/AboutButton";
import { Logo } from "../../layout/Logo";
import Seo from "../../components/Seo";
import { Teaser } from "./Teaser";
import { DEFAULT_DESCRIPTION } from "../../constants";
import { useTheme } from "../../theme/useTheme";

export function CountdownPage() {
    // not needed
    const startDate = new Date('tomorrow');
    const {
        info: { caps },
    } = useTheme();
    return (
        <>
            <header className="App-header">
                <div className="toolbar small">
                    <Logo small logo="logo" />
                    <AboutButton />
                </div>
            </header>
            <article className="App-body countdownPage">
                <Teaser />
            </article>
            <Seo
                description={`${DEFAULT_DESCRIPTION}. We will start ${startDate.toDateString()}`}
                title={`${caps} | We are getting ready`}
            />
        </>
    );
};
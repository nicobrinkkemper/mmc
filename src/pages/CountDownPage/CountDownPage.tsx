import { AboutButton } from "../../about/AboutButton";
import { Logo } from "../../Logo";
import Seo from "../../Seo";
import { Teaser } from "./Teaser";
import { DEFAULT_DESCRIPTION } from "../../constants";
import { useTheme } from "../../theme/useTheme";
import { useLevelData } from "../../useLevelData";

export function CountdownPage() {
    const levelData = useLevelData();
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
                description={`${DEFAULT_DESCRIPTION}. We will start ${levelData.startDate.toDateString()}`}
                title={`${caps} | We are getting ready`}
            />
        </>
    );
};
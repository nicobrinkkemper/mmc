import { AboutButton } from "../../about/AboutButton";
import { BackButton } from "../../BackButton";
import Level from "./Level";
import { Logo } from "../../Logo";

export function LevelPage() {
    return (
        <>
            <header className="App-header">
                <div className="toolbar small">
                    <Logo small logo="logo_simple" />
                    <AboutButton />
                </div>
                <BackButton />
            </header>
            <article className="App-body levelPage">
                <Level />
            </article>
        </>
    )
}
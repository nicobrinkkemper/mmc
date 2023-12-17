import { AboutButton } from "../../about/AboutButton";
import { BackButton } from "../../BackButton";
import Batch from "./Batch";
import { Logo } from "../../Logo";
import { WeekTrailer } from "../../WeekTrailer/WeekTrailer";

export function LevelBatchPage() {
    return <>
        <header className="App-header">
            <div className="toolbar small">
                <Logo logo="logo_simple" small />
                <AboutButton />
            </div>
            <WeekTrailer />
            <BackButton />
        </header>
        <article className="App-body BatchPage">
            <Batch />
        </article>
    </>
};
import { AboutButton } from "../../about/AboutButton";
import { BackButton } from "../../components/BackButton";
import { Batch } from "./Batch";
import { Logo } from "../../layout/Logo";
import { WeekTrailer } from "./WeekTrailer/WeekTrailer";

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
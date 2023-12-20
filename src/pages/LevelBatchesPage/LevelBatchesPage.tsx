import { AboutButton } from "../../about/AboutButton";
import { BackButton } from "../../components/BackButton";
import { Batches } from "./Batches";
import { Logo } from "../../layout/Logo";

export function BatchesPage() {
    return (
        <>
            <header className="App-header">
                <div className="toolbar big">
                    <Logo logo="logo" />
                    <AboutButton />
                </div>
                <BackButton />
            </header>
            <article className="App-body Batches">
                <Batches />
            </article>
        </>
    )
}
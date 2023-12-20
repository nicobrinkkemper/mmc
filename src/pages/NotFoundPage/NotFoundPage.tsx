import { Logo } from "../../layout/Logo";
import { NotFound } from "./NotFound";

export function NotFoundPage() {
    return (
        <>
            <header className="App-header">
                <div className="toolbar small">
                    <Logo logo="logo_simple" small />
                </div>
            </header>
            <article className="App-body notFoundPage">
                <NotFound />
            </article>
        </>
    )
}
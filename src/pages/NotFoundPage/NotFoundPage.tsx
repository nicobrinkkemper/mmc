import { Logo } from "../../Logo";
import { NotFound } from "./NotFound";

export function NotFoundPage() {
    return (
        <>
            <header className="App-header">
                <div className="toolbar big">
                    <Logo />
                </div>
            </header>
            <article className="App-body notFoundPage">
                <NotFound />
            </article>
        </>
    )
}
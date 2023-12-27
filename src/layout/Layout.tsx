import { ComponentProps, PropsWithChildren } from "react";
import { Header } from "./Header";
import classNames from "classnames";
import Seo from "../components/Seo";
import { Footer } from "./Footer";
import { About } from "../about/About";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../ErrorFallback";

export function Layout({ children, className, type = 'normal', small = false, seo }: PropsWithChildren<{
    className?: string
    type?: 'special' | 'simple' | 'normal'
    small?: boolean
    seo: ComponentProps<typeof Seo>
}>) {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Header type={type} small={small} />
            <article className={classNames('App-body', className)}>
                {children}
            </article>
            <About />
            <Footer />
            <Seo {...seo} />
        </ErrorBoundary>
    )
}
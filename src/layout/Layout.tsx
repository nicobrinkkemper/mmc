import { ComponentProps, PropsWithChildren } from "react";
import { Seo } from "../components/Seo";
import { Footer } from "./Footer";
import { About } from "../about/About";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../ErrorFallback";
import { BackButton } from "../components/BackButton";
import { AboutButton } from "../about/AboutButton";
import { Logo } from "./Logo";

export function Layout({ children, className, type = 'normal', small = false, seo }: PropsWithChildren<{
    className?: string
    type?: 'special' | 'simple' | 'normal'
    small?: boolean
    seo: ComponentProps<typeof Seo>
}>) {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AboutButton />
            <Logo small={small} logo={type === 'normal' ? 'logo' : `logo_${type}`} />
            <article className={className}>
                <BackButton />
                {children}
            </article>
            <About />
            <Footer />
            <Seo {...seo} />
        </ErrorBoundary>
    )
}
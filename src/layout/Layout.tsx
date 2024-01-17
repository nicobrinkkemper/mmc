import { ComponentProps, PropsWithChildren } from "react";
import { About } from "../about/About";
import { AboutButton } from "../about/AboutButton";
import { BackButton } from "../components/BackButton";
import { Seo } from "../components/Seo";
import { Footer } from "./Footer";
import { Logo } from "./Logo";

export function Layout({
  children,
  className,
  type = "normal",
  small = false,
  seo,
}: PropsWithChildren<{
  className?: string;
  type?: "special" | "simple" | "normal";
  small?: boolean;
  seo: ComponentProps<typeof Seo>;
}>) {
  return (
    <>
      <AboutButton />
      <Logo small={small} logo={type === "normal" ? "logo" : `logo_${type}`} />
      <article className={className}>
        <BackButton />
        {children}
      </article>
      <About />
      <Footer />
      <Seo {...seo} />
    </>
  );
}

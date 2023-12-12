import { contents } from "./contents";
import { useTheme } from "../theme/useTheme";

export function AboutContent() {
    const { theme } = useTheme();
    const Content = contents[theme]
    return <Content.AboutContent />;
}
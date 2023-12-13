import { contents } from "./contents";
import { useTheme } from "../theme/useTheme";

export function WelcomeContent() {
    const { theme } = useTheme();
    const Content = contents[theme]
    return <Content.WelcomeContent />;
}
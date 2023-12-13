import { contents } from "./contents";
import { useTheme } from "../theme/useTheme";

export function CreditsContent() {
    const { theme } = useTheme();
    const Content = contents[theme]
    return <Content.CreditsContent />;
}
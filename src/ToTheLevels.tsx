import Button from "./Button"
import { useTheme } from "./theme/useTheme";

export const ToTheLevels = () => {
    const { themeSlug } = useTheme();
    return (<Button primary={true} icon="arrow-right" to={`${themeSlug}levels/`} id="to-levels">
        To the levels
    </Button>)
}

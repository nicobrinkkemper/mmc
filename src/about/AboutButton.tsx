import Button from "../components/Button";
import { useTheme } from "../theme/useTheme";

export const AboutButton = () => {
    const { info: { currentThemeUrl } } = useTheme(); // this solves redirecting to '/' when running build-gh
    return <Button inverted={true} icon={"info-inverted"} to={`/${currentThemeUrl}#!/about`} classList={['AboutBtn']}>About</Button>
}


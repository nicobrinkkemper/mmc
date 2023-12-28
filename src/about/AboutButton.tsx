import Button from "../components/Button";
import { useTheme } from "../theme/useTheme";
import styles from "./AboutButton.module.css";
export const AboutButton = () => {
    // this solves redirecting to '/' when running build-gh
    const { info: { currentThemeUrl } } = useTheme();
    // because it always puts the theme in the url, the user will see url change from / to /theme#!/about
    return <Button inverted={true} icon={"info-inverted"} to={`/${currentThemeUrl}#!/about`} classList={[styles.AboutButton]}>About</Button>
}


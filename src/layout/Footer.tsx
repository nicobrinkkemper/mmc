import { Link } from "react-router-dom";
import { useTheme } from "../theme/useTheme";

export function Footer() {
    const { themeSlug } = useTheme();
    return (
        <footer className="App-footer">
            <a
                href="https://discord.gg/8mnW3XfZq9"
                rel="noopener noreferrer"
                target="_BLANK"
            >
                Discord
            </a>
            <a
                href="https://www.youtube.com/channel/UClayAs7TxVjMbzBLxBbqyoQ"
                rel="noopener noreferrer"
                target="_BLANK"
            >
                Youtube
            </a>
            <Link relative={"route"} to={`/${themeSlug}credits/`}>
                Credits
            </Link>
        </footer>
    )
}
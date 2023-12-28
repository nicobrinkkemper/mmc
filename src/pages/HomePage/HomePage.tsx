import { DEFAULT_DESCRIPTION } from "../../constants";
import { useTheme } from "../../theme/useTheme";
import { Layout } from "../../layout/Layout";
import { Content } from "../../content/Content";

export function HomePage() {
    const { info: { caps, writtenOut } } = useTheme();
    return (
        <Layout type="special" seo={
            {
                description: `Welcome to ${caps}! ${DEFAULT_DESCRIPTION}`,
                title: `${writtenOut} | Welcome`
            }
        }>
            <Content.Welcome />
        </Layout>
    )
}
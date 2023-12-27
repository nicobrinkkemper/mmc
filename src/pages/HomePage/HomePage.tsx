import { DEFAULT_DESCRIPTION } from "../../constants";
import { useTheme } from "../../theme/useTheme";
import { useContent } from "../../content/useContent";
import { Layout } from "../../layout/Layout";

export function HomePage() {
    const { info: { caps } } = useTheme();
    const WelcomeContent = useContent('WelcomeContent');
    return (
        <Layout type="special" seo={
            {
                description: `Welcome to ${caps}! ${DEFAULT_DESCRIPTION}`,
                title: `${caps} | Welcome`
            }
        }>
            <WelcomeContent />
        </Layout>
    )
}
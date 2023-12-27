import { DEFAULT_DESCRIPTION } from "../../constants";
import { useTheme } from "../../theme/useTheme";
import styles from "./Credits.module.css";
import { useContent } from "../../content/useContent";
import { Layout } from "../../layout/Layout";

export function CreditPage() {
    const { info: { caps } } = useTheme();
    const CreditsContent = useContent('CreditsContent');
    return (
        <Layout type="special" seo={{
            description: `Special thanks to all contributors! ${DEFAULT_DESCRIPTION}`,
            title: `${caps} | Credits | Site by General BB`
        }}>
            <CreditsContent className={styles.CreditsCard} />
        </Layout>
    );
}
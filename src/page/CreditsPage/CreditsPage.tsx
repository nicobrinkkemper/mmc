import { DEFAULT_DESCRIPTION } from "../../constants";
import { useTheme } from "../../theme/useTheme";
import styles from "./Credits.module.css";
import { Layout } from "../../layout/Layout";
import { Content } from "../../copy/Content";

export function CreditPage() {
    const { info: { caps } } = useTheme();
    return (
        <Layout type="special" seo={{
            description: `Special thanks to all contributors! ${DEFAULT_DESCRIPTION}`,
            title: `${caps} | Credits | Site by General BB`
        }}>
            <Content.Credits className={styles.CreditsCard} />
        </Layout>
    );
}
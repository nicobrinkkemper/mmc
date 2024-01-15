import { Batches } from "./Batches";
import { Layout } from "../../layout/Layout";
import { useTheme } from "../../theme/useTheme";

export function BatchesPage() {
    const { info: { caps }, data: { batches } } = useTheme();
    return (
        <Layout seo={
            {
                description: `Week overview of ${caps}. ${batches.length} weeks released so far!`,
                title: `${caps} | Week overview`
            }}
        >
            <Batches />
        </Layout>
    )
}
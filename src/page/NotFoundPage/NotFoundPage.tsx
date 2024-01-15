import { Layout } from "../../layout/Layout";
import { NotFound } from "./NotFound";

export function NotFoundPage({ error }: Readonly<{ error?: string }>) {
    return (
        <Layout type="simple" small seo={{
            description: "Page not found",
            title: "404 | Page not found"
        }}>
            <NotFound error={error} />
        </Layout>
    )
}
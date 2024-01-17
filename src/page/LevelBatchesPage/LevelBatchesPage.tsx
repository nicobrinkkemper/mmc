import { Layout } from "../../layout/Layout";
import { useTheme } from "../../theme/useTheme";
import { Batches } from "./Batches";

export function BatchesPage() {
  const {
    info: { caps },
    data: { batches },
  } = useTheme();
  return (
    <Layout
      seo={{
        description: `Week overview of ${caps}. ${batches.length} weeks released so far!`,
        title: `${caps} | Week overview`,
      }}
    >
      <Batches />
    </Layout>
  );
}

import { Teaser } from "./Teaser";
import { DEFAULT_DESCRIPTION } from "../../constants";
import { useTheme } from "../../theme/useTheme";
import { Layout } from "../../layout/Layout";

export function CountdownPage() {
    const {
        startDate,
        info: { caps },
    } = useTheme();
    return (
        <Layout type='simple' seo={{
            description: `${DEFAULT_DESCRIPTION}. We will start ${startDate.toDateString()}`,
            title: `${caps} | We are getting ready`
        }}>
            <Teaser />
        </Layout >
    );
};
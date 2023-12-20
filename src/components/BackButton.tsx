import Button from "./Button";
import { useTheme } from "../theme/useTheme";
import { useParams } from "react-router-dom";

const BackButton = () => {
    const { themeSlug, data } = useTheme();
    const { batchNumber, order } =
        useParams<{ batchNumber: string; order: string }>();

    if (typeof batchNumber === "string" && typeof order === "string")
        return (
            <Button
                icon="arrow-left-inverted"
                iconPosition="left"
                to={`/${themeSlug}levels/${batchNumber}/`}
                inverted={true}
                classList={['backTo']}
            >
                Back to {data.batches[Number(batchNumber) - 1].releaseDate.formatted}
            </Button>
        );
    else if (typeof batchNumber === "string")
        return (
            <Button
                icon="arrow-left-inverted"
                iconPosition="left"
                to={`/${themeSlug}levels/`}
                inverted={true}
                classList={['backTo']}
            >
                Back to Weeks
            </Button>
        );
    return (
        <Button
            icon="arrow-left-inverted"
            iconPosition="left"
            to={`/${themeSlug}`}
            inverted={true}
            classList={['backTo']}
        >
            Back to Welcome
        </Button>
    );
};

export { BackButton }
import Button from "./Button";
import { formatDate } from "./formatDate";
import { useTheme } from "./theme/useTheme";
import { useLevelData } from "./useLevelData";
import { useParams } from "react-router-dom";

const BackButton = () => {
    const levelData = useLevelData();
    const { themeSlug } = useTheme();
    const { batchNumber, order } =
        useParams<{ batchNumber: string; order: string }>();
    if (levelData.startDate.getTime() > Date.now())
        return (
            <Button
                icon="arrow-left-inverted"
                iconPosition="left"
                to={`/${themeSlug}`}
                inverted={true}
                classList={['backTo']}
            >
                Back to Teaser
            </Button>
        );

    if (typeof batchNumber === "string" && typeof order === "string")
        return (
            <Button
                icon="arrow-left-inverted"
                iconPosition="left"
                to={`/${themeSlug}levels/${batchNumber}/`}
                inverted={true}
                classList={['backTo']}
            >
                Back to {formatDate(levelData.releaseDays[Number(batchNumber) - 1])}
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
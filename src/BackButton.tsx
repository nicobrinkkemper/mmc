import Button from "Button";
import formatDate from "formatBatchName";
import { useParams } from "react-router-dom";
import { releaseDays } from "useLevelData";

const BackButton = () => {
    const { batchNumber, order } =
        useParams<{ batchNumber: string; order: string }>();
    if (releaseDays[0].getTime() > Date.now())
        return (
            <Button
                icon="arrow-left-inverted"
                iconPosition="left"
                to={`/`}
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
                to={`/levels/${batchNumber}`}
                inverted={true}
                classList={['backTo']}
            >
                Back to {formatDate(releaseDays[Number(batchNumber) - 1])}
            </Button>
        );
    else if (typeof batchNumber === "string")
        return (
            <Button
                icon="arrow-left-inverted"
                iconPosition="left"
                to="/levels"
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
            to="/"
            inverted={true}
            classList={['backTo']}
        >
            Back to Welcome
        </Button>
    );
};

export { BackButton }
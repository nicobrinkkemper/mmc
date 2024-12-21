import { useBatch } from "../../theme/useBatch";

export const DefaultBatchHeader = ({
    levelNumber,
}: Readonly<{
    levelNumber?: number;
}>) => {
    const batch = useBatch();
    const {
        batch: { releaseDate },
    } = batch;
    return <>{levelNumber === 1 ? releaseDate.formatted : undefined}</>;
}
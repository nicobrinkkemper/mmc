import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useLevelData } from "../useLevelData";

export function useLevelFromParams(){
    const params =
        useParams<Record<"batchNumber" | "order", string | undefined>>();
    const levelData = useLevelData();
    return useMemo(() => {
        const order = Number(params.order);
        const batchNumber = Number(params.batchNumber);
        if(isNaN(order))  throw new Error("Invalid params: order");
        if(isNaN(batchNumber))  throw new Error("Invalid params: batchNumber");
        const levels = levelData.levels(batchNumber);
        const level = levels.find(({ order: _order }) => _order === order);
        if (typeof level !== "object")  throw new Error(`Invalid data: ${typeof level}`);
        if(order !== level.order)  throw new Error("Invalid data: order");
        if(batchNumber !== level.batchNumber)  throw new Error("Invalid data: batchNumber");

        const startOrder = levels[0].order;
        const endOrder = levels[levels.length - 1].order;
        const hasPreviousLevel = Number(order) > startOrder;
        const hasNextLevel = endOrder > Number(order);
        const releaseDay = levelData.releaseDays[batchNumber - 1];
        const isNew = levelData.newestBatch === batchNumber - 1;
        const isUnreleased = levelData.releasedBatches.indexOf(releaseDay) === -1;
        const tags = level.tags.split(",");

        return { hasPreviousLevel, hasNextLevel, startOrder, endOrder, isNew, isUnreleased, tags, data: level }
    }, [levelData, params]);
}
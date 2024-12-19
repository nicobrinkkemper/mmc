import { createContext, useContext } from "react";
export const BatchContext = createContext(undefined);
export const SelectedBatchIndexContext = createContext(undefined);
export function useBatch() {
    const batch = useContext(BatchContext);
    if (!batch) {
        throw new Error("We can only use this hook on a batch page");
    }
    return batch;
}
//# sourceMappingURL=useBatch.js.map
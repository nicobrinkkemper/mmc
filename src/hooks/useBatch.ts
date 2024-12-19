import { createContext, useContext } from "react";

export const BatchContext = createContext<ThemeBatch | undefined>(undefined);
export const SelectedBatchIndexContext = createContext<number | undefined>(
  undefined
);

export function useBatch(): ThemeBatch {
  const batch = useContext(BatchContext);
  if (!batch) {
    throw new Error("We can only use this hook on a batch page");
  }
  return batch;
}

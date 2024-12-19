import { createContext, useContext } from "react";

export const BatchesContext = createContext<ThemeBatch[] | undefined>(
  undefined
);

export function useBatches(): ThemeBatch[] {
  const batches = useContext(BatchesContext);
  if (!batches || !batches.length) {
    throw new Error("We can only use this hook on a batches overview page");
  }
  return batches;
}

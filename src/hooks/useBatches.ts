import { createContext, useContext } from "react";

export type BatchesContextType<
  T extends Theme = Theme,
  B extends NumberParam = NumberParam
> = ThemeBatch<`/${T}/levels/${B}`>[];

export const BatchesContext = createContext<BatchesContextType | undefined>(
  undefined
);

export function useBatches(): ThemeBatch<`/${Theme}/levels/${NumberParam}`>[] {
  const batches = useContext(BatchesContext);
  if (!batches || !batches.length) {
    throw new Error("We can only use this hook on a batches overview page");
  }
  return batches;
}

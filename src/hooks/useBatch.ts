import { createContext, useContext } from "react";

export type BatchContextType = ThemeBatch<`/${Theme}/levels/${string}`>;

export const BatchContext = createContext<BatchContextType | undefined>(
  undefined
);

export function useBatch(): BatchContextType {
  const batch = useContext(BatchContext);
  if (!batch) {
    throw new Error("We can only use this hook on a batch page");
  }
  return batch;
}

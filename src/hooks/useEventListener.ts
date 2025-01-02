import * as React from "react";

export const useEventListener = (
  event: string,
  callback: (e: Event) => void
) => {
  React.useEffect(() => {
    window.addEventListener(event, callback);
    return () => window.removeEventListener(event, callback);
  }, [event, callback]);
};

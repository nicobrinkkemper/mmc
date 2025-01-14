import React from "react";

export const useEventListener = (
  event: string,
  callback: (e: Event) => void
) => {
  const cbRef = React.useRef(callback);
  const eventRef = React.useRef(event);
  cbRef.current = callback;
  eventRef.current = event;

  React.useEffect(() => {
    window.addEventListener(eventRef.current, cbRef.current);
    return () => window.removeEventListener(eventRef.current, cbRef.current);
  }, []);
};

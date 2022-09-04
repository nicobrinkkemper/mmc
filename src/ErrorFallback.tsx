import NotFound from "./NotFound";

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
}) {
  return (
    <NotFound error={error.message} />
  );
}

export { ErrorFallback };

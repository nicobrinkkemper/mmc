import { NotFound } from "./pages/NotFoundPage/NotFound";

function ErrorFallback({
  error,
}: {
  readonly error: Error;
}) {
  return (
    <NotFound error={error.message} />
  );
}

export { ErrorFallback };

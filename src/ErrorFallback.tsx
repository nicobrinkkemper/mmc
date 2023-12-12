import { NotFound } from "./NotFound";

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

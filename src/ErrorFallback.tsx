import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";

function ErrorFallback({
  error,
}: {
  readonly error: Error;
}) {
  return (
    <NotFoundPage error={error.message} />
  );
}

export { ErrorFallback };

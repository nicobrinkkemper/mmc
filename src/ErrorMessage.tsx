import React from "react";

export function ErrorMessage({
  error,
}: {
  error: { message: string; stack?: string };
}) {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      {error.stack && <p style={{ whiteSpace: "pre-wrap" }}>{error.stack}</p>}
    </div>
  );
}

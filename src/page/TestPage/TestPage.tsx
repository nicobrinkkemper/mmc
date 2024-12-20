import * as React from "react";

export function TestPage(...args: any[]) {
  return (
    <div>
      <h1>Test Page</h1>
      <p>Received props:</p>
      <pre>{JSON.stringify(args)}</pre>
    </div>
  );
}

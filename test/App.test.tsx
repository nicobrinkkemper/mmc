import { render, screen } from "@testing-library/react";
import * as React from "react";
import { expect, test } from "vitest";
import { App } from "../src/App.js";

test("renders React App", () => {
  render(
    <App
      pathInfo={{
        theme: "4ymm",
      }}
      children={<div>test</div>}
    />
  );
  const linkElement = screen.getByText(/test/i);
  expect(linkElement).toBeDefined();
});

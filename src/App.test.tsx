import { render, screen } from "@testing-library/react";
import * as React from "react";
import { expect, test } from "vitest";
import { AppStatic } from "./App.js";

test("renders React App", () => {
  render(
    <AppStatic
      pathInfo={{
        theme: "4ymm",
      }}
      children={<div>test</div>}
    />
  );
  const linkElement = screen.getByText(/test/i);
  expect(linkElement).toBeDefined();
});

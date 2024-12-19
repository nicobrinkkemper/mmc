import { render, screen } from "@testing-library/react";
import * as React from "react";
import { expect, test } from "vitest";
import { App } from "./App.js";

test("renders About button", () => {
  render(<App />);
  const linkElement = screen.getByText(/About/i);
  expect(linkElement).toBeDefined();
});

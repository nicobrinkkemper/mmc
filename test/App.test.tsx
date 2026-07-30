import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { App } from "../src/App.js";

test("renders React App", () => {
  render(<App children={<div>test</div>} />);
  const linkElement = screen.getByText(/test/i);
  expect(linkElement).toBeDefined();
});

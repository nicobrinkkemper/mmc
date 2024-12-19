import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { expect, test } from "vitest";
import { AppClient } from "../../AppClient.js";
test("renders Trailers SECTION", () => {
  render(<AppClient />);
  fireEvent.click(screen.getByText(/Credits/i));
  const linkElement = screen.getByText(/Trailers/i);
  expect(linkElement).toBeDefined();
});

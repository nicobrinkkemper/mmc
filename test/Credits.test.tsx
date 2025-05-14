import { render, screen } from "@testing-library/react";
import * as React from "react";
import { expect, test } from "vitest";
import { Page } from "../src/page/_theme/credits/page.js";
import { props } from "../src/page/_theme/credits/props.js";

const Test4YMMCreditsPage = Page;
const allProps = await props(`/4ymm/credits`);

test("renders credits page", () => {
  render(<Test4YMMCreditsPage {...allProps} />);
  const linkElement = screen.getByText(/Special thanks to Kiavik and Lektor/i);
  expect(linkElement).toBeDefined();
});

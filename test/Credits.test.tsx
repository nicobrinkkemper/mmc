import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Page } from "../src/app/$theme/credits/page.js";
import { props } from "../src/app/$theme/credits/props.js";

const Test4YMMCreditsPage = Page;
const allProps = await props(`/4ymm/credits`);

test("renders credits page", () => {
  render(<Test4YMMCreditsPage {...allProps} />);
  const linkElement = screen.getByText(/Special thanks to Kiavik and Lektor/i);
  expect(linkElement).toBeDefined();
});

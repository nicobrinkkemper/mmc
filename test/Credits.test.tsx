import { render, screen } from "@testing-library/react";
import * as React from "react";
import { expect, test } from "vitest";
import { Page } from "./page.js";

const Test4YMMCreditsPage = Page as CreditsPageType<"4ymm">;

test("renders credits page", () => {
  render(
    <Test4YMMCreditsPage
      images={{
        logo: [
          {
            srcSet: "test",
            width: 100,
            height: 100,
            aspectRatio: "1",
            src: "test.jpg",
          },
        ],
      }}
      pathInfo={{
        theme: "4ymm",
        path: "/credits",
        to: "/4ymm/credits",
        toCredits: "/4ymm/credits",
        toLevels: "/4ymm/levels",
        toHome: "/4ymm",
        segments: ["4ymm", "credits"],
        params: {},
      }}
      adjacent={{
        next: {
          exists: true,
          value: {
            pathInfo: {
              to: "/6ymm/credits",
            },
            images: {
              logo: [
                {
                  srcSet: "test",
                  width: 100,
                  height: 100,
                  aspectRatio: "1",
                  src: "test.jpg",
                },
              ],
            },
          },
        },
        prev: {
          exists: false,
        },
      }}
      clickable={"a"}
    />
  );
  const linkElement = screen.getByText(/Special thanks to Kiavik and Lektor/i);
  expect(linkElement).toBeDefined();
});

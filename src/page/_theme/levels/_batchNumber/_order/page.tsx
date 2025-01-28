import * as React from "react";
import { App } from "../../../../../App.js";
import { Button } from "../../../../../components/Button.js";
import { Layout } from "../../../../../layout/Layout.js";
import { LevelAdjacent } from "./LevelAdjacent.js";
import { LevelCard } from "./LevelCard.js";
import { MakerCard } from "./MakerCard.js";
import { type RouteType } from "./props.js";

export const Page: ThemePageComponent<RouteType> = ({
  images: { logo, logo_small, logo_simple_small },
  level: {
    adjacent,
    makerName,
    nationality,
    makerId,
    makerDescription,
    levelName,
    levelCode,
    description,
    tags,
    difficulty,
    difficultyName,
    images,
  },
  batch: { batchName },
  pathInfo: { theme, toBatch, toCredits, toHome },
  clickable,
}) => {
  return (
    <App pathInfo={{ theme }}>
      <Layout
        small
        images={{ logo: logo_simple_small ?? logo_small ?? logo }}
        pathInfo={{
          toHome,
          toCredits,
        }}
        clickable={clickable}
        adjacent={undefined as never}
      >
        <Button
          icon="arrow-left-inverted"
          iconPosition="left"
          href={toBatch}
          inverted={true}
          clickable={clickable}
        >
          {`Back to ${batchName.toLowerCase()}`}
        </Button>
        <LevelCard
          level={{
            images,
            makerName,
            levelName,
            levelCode,
            description,
            tags,
            difficulty,
            difficultyName,
          }}
        />
        <MakerCard
          level={{
            makerName,
            nationality,
            makerId,
            images,
            makerDescription,
          }}
        />
        <LevelAdjacent level={{ adjacent }} clickable={clickable} />
      </Layout>
    </App>
  );
};

import * as React from "react";
import { App } from "../../../../../App.js";
import { Button } from "../../../../../components/Button.js";
import { Layout } from "../../../../../layout/Layout.js";
import { LevelAdjacent } from "./LevelAdjacent.js";
import { LevelCard } from "./LevelCard.js";
import { MakerCard } from "./MakerCard.js";
import { type RouteType } from "./props.js";

export const Page: ThemePageComponent<RouteType> = ({
  images: { logo, logo_small, logo_simple_small, favicon },
  favicons,
  image,
  published,
  updated,
  twitter,
  contentType,
  category,
  tags,
  url,
  title,
  description,
  level,
  batch: { batchName, batchNumber },
  pathInfo: { theme, toBatch, toCredits, toHome },
  clickable,
}) => {
  return (
    <App
      pathInfo={{ theme }}
      favicons={favicons}
      published={published}
      updated={updated}
      image={image}
      tags={tags}
      url={url}
      contentType={contentType}
      category={category}
      twitter={twitter}
      title={title}
      description={description}
    >
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
            images: level.images,
            makerName: level.makerName,
            levelName: level.levelName,
            levelCode: level.levelCode,
            description: level.description,
            tags: level.tags,
            difficulty: level.difficulty,
            difficultyName: level.difficultyName,
          }}
        />
        <MakerCard
          level={{
            makerName: level.makerName,
            nationality: level.nationality,
            makerId: level.makerId,
            images: level.images,
            makerDescription: level.makerDescription,
          }}
        />
        <LevelAdjacent
          level={{ adjacent: level.adjacent, batchNumber }}
          clickable={clickable}
          pathInfo={{ theme }}
        />
      </Layout>
    </App>
  );
};

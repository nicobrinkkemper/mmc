import * as React from "react";
import { App } from "../../../../App.js";
import { Button } from "../../../../components/Button.js";
import { Layout } from "../../../../layout/Layout.js";
import { BatchAdjacent } from "./BatchAdjacent.js";
import { LevelList } from "./LevelList.js";
import styles from "./LevelList.module.css";
import { LevelListHeader } from "./LevelListHeader.js";
import type { RouteType } from "./props.js";

export const Page: ThemePageComponent<RouteType> = ({
  images: { logo, logo_small, logo_simple_small, favicon },
  pathInfo,
  batch,
  clickable,
  favicons,
  published,
  updated,
  image,
  twitter,
  contentType,
  category,
  tags,
  url,
  title,
  description,
}) => {
  const { theme, toLevels, toCredits, toHome } = pathInfo;
  return (
    <>
      <App
        pathInfo={{ theme }}
        favicons={favicons}
        published={published}
        updated={updated}
        twitter={twitter}
        contentType={contentType}
        category={category}
        tags={tags}
        url={url}
        title={title}
        description={description}
        image={image}
      >
        <Layout
          small={true}
          images={{
            logo: logo_simple_small ?? logo_small ?? logo,
          }}
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
            href={toLevels}
            inverted={true}
            clickable={clickable}
          >
            Back to releases
          </Button>
          {batch.weekTrailer ? (
            <div className={styles["Youtube"]}>
              <iframe
                className={styles["Iframe"]}
                title={batch.weekTrailer}
                allowFullScreen={true}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                src={`https://www.youtube.com/embed/${batch.weekTrailer}?modestbranding=1&enablejsapi=1&controls=1&rel=0&loop=1&listType=playlist`}
              />
            </div>
          ) : null}
          <LevelListHeader
            batch={{
              batchName: batch.batchName,
              batchDescription: batch.batchDescription,
              image: batch.image,
            }}
          />
          <LevelList
            batch={{ levels: batch.levels }}
            clickable={clickable}
            pathInfo={pathInfo}
          />
          <BatchAdjacent
            batch={{ adjacent: batch.adjacent }}
            clickable={clickable}
          />
        </Layout>
      </App>
    </>
  );
};

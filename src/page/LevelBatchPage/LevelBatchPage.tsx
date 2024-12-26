import classNames from "classnames";
import * as React from "react";
import { AppStatic } from "../../App.js";
import { Button } from "../../components/Button.js";
import { Layout } from "../../layout/Layout.js";
import { BatchStatic } from "./Batch.js";
import styles from "./Batch.module.css";
import { YouTubeIframeStatic } from "./Youtube/YoutubeIframe.js";

export const LevelBatchPageStatic: LevelBatchPageType = ({
  images,
  pathInfo,
  batch,
  clickable,
}) => {
  return (
    <AppStatic pathInfo={pathInfo}>
      <Layout
        type="simple"
        small
        images={images}
        pathInfo={pathInfo}
        clickable={clickable}
        adjacent={undefined as never}
      >
        <Button
          icon="arrow-left-inverted"
          iconPosition="left"
          href={pathInfo.toLevels}
          inverted={true}
          clickable={clickable}
        >
          Back to Overview
        </Button>
        <YouTubeIframeStatic
          videoId={batch.weekTrailer}
          src={`https://www.youtube.com/embed/${batch.weekTrailer}?modestbranding=1&enablejsapi=1&controls=1&rel=0&loop=1&listType=playlist`}
        />
        <BatchStatic batch={batch} clickable={clickable} />
        <div
          className={classNames(
            styles["Navigation"],
            batch.adjacent.next.exists && styles["hasNextBatch"],
            batch.adjacent.prev.exists && styles["hasPreviousBatch"]
          )}
        >
          {batch.adjacent.prev.exists ? (
            <Button
              icon="arrow-left"
              iconPosition="left"
              href={batch.adjacent.prev.value.pathInfo.to}
              hidden={!batch.adjacent.prev.exists}
              clickable={clickable}
            >
              <span className={styles["hidden"]}>Previous</span>
            </Button>
          ) : null}
          {batch.adjacent.next.exists ? (
            <Button
              icon="arrow-right"
              href={batch.adjacent.next.value.pathInfo.to}
              hidden={!batch.adjacent.next.exists}
              clickable={clickable}
            >
              Next batch
            </Button>
          ) : null}
        </div>
      </Layout>
    </AppStatic>
  );
};

import classNames from "classnames";
import * as React from "react";
import { AppStatic } from "../../App.static.js";
import { BackToWeeks } from "../../components/BackButton.js";
import { Button } from "../../components/Button.js";
import { LayoutStatic } from "../../layout/Layout.js";
import { BatchStatic } from "./Batch.js";
import styles from "./Batch.module.css";
import { YouTubeIframeStatic } from "./Youtube/YoutubeIframe.js";

export type LevelBatchPageStaticProps = Pick<
  ThemeStaticData,
  "theme" | "images" | "pathInfo"
> & {
  batch: ThemeBatch;
} & Clickable;

export function LevelBatchPageStatic({
  theme,
  images,
  pathInfo,
  batch,
  clickable,
}: LevelBatchPageStaticProps) {
  return (
    <AppStatic theme={theme}>
      <LayoutStatic
        type="simple"
        small
        theme={theme}
        images={images}
        pathInfo={pathInfo}
        clickable={clickable}
      >
        <BackToWeeks toLevels={pathInfo.toLevels} clickable={clickable} />
        <YouTubeIframeStatic
          videoId={batch.weekTrailer}
          src={`https://www.youtube.com/embed/${batch.weekTrailer}?modestbranding=1&enablejsapi=1&controls=1&rel=0&loop=1&listType=playlist`}
        />
        <BatchStatic batch={batch} clickable={clickable} />
        <div
          className={classNames(
            styles["Navigation"],
            batch.nextAndPrev.nextBatch.exists && styles["hasNextBatch"],
            batch.nextAndPrev.prevBatch.exists && styles["hasPreviousBatch"]
          )}
        >
          {batch.nextAndPrev.prevBatch.exists ? (
            <Button
              icon="arrow-left"
              iconPosition="left"
              href={batch.nextAndPrev.prevBatch.batch.pathInfo.to}
              hidden={!batch.nextAndPrev.prevBatch.exists}
              clickable={clickable}
            >
              <span className={styles["hidden"]}>Previous</span>
            </Button>
          ) : null}
          {batch.nextAndPrev.nextBatch.exists ? (
            <Button
              icon="arrow-right"
              href={batch.nextAndPrev.nextBatch.batch.pathInfo.to}
              hidden={!batch.nextAndPrev.nextBatch.exists}
              clickable={clickable}
            >
              Next batch
            </Button>
          ) : null}
        </div>
      </LayoutStatic>
    </AppStatic>
  );
}

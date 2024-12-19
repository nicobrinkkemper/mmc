import * as React from "react";
export declare enum Commands {
    play = 0,
    pause = 1,
    stop = 2,
    mute = 3,
    unMute = 4
}
type Props = {
    videoId: string;
    src: string;
};
declare const YouTubeIframeStatic: ({ videoId, src }: Props) => React.JSX.Element;
export { YouTubeIframeStatic };
//# sourceMappingURL=YoutubeIframe.d.ts.map
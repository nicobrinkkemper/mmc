import Button from "../../Button";
import { Card } from "../../Card";
import { ToTheLevels } from "../../ToTheLevels";
import { StayUpToDate } from "../default/StayUpToDate";

export const MM7ContentCreator = () => (
    <Card heading={<h1>Content creator?</h1>} subHeading={<h2>
        If you are a streamer, a YouTuber, a video game writer or in any other way a content creator, we have readied a Drive folder for you.
    </h2>}>
        <p>
            Here you will find visual elements from the project: Logos, illustrations and other goodies. These are free to use for thumbnails, video overlays and other purposes. New elements will be released every week, so if you bookmark the folder you’ll have access to these as soon as they are made available.
        </p>
        <Button
            icon="folder"
            to="https://drive.google.com/drive/folders/1dJDQQCn7_Xx0xyI-JoR01dQTH62MlFa0"
        >
            Open folder
        </Button>
    </Card>)

const MM7ArtWork = () => (
    <Card heading={<h1>Community Artwork Gallery</h1>}>
        <p>
            Our amazing community supplied much of the art for the trailers. Click here to see your favorites in full detail! Forgive the dust - Page is a work in progress.
        </p>
        <Button icon="arrow-right" to="https://mmcelebration.com/mmc/7mmc_gallery/">
            To the Gallery
        </Button>
    </Card>
)

export const WelcomeContent = () => (
    <>
        <Card illustration="home" heading={<h1>The seventh yearly Mario Maker celebration</h1>} subHeading={<h2>Mario Maker turns seven!</h2>}>
            <p>
                The anniversary project is under new management and a new banner, but you'll still see many familiar names crop up along with new ones as we celebrate another year of Mario Maker. Every weekend across the next couple of months we'll publish a batch of varied and rigorously playtested levels!
            </p>
            <p>
                Every level has birthday balloons for you to discover. Can you find them all?
            </p>
            <ToTheLevels />
        </Card>
        <MM7ContentCreator />
        <StayUpToDate />
        <MM7ArtWork />
    </>
);

import Button from "../../../components/Button";
import { Card } from "../../../components/Card";

export const MM7ContentCreatorCard = () => (
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
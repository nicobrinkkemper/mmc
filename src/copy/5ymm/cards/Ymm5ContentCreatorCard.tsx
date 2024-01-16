import Button from "../../../components/Button";
import { Card } from "../../../components/Card";


export const Ymm5ContentCreatorCard = () => (
    <Card heading={<h1>Content creator?</h1>}>
        <p>
            If you are a streamer, a YouTuber, a video game writer or in any other way a content creator, we have readied a Drive folder for you.
        </p>
        <p>
            Here you will find visual elements from the project: Logos, illustrations and other goodies. These are free to use for thumbnails, video overlays and other purposes. New elements will be released every week, so if you bookmark the folder you{"\u{2019}"}ll have access to these as soon as they are made available.
        </p>
        <Button
            icon="folder"
            to="https://drive.google.com/drive/folders/1XyDe_a-6EtSVUvS4Clk0V5oK5PXg6q8i"
        >
            Open folder
        </Button>
    </Card>)
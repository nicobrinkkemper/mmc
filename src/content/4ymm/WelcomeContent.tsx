import Button from "../../components/Button";
import { Card } from "../../components/Card";
import { ToTheLevels } from "../../components/ToTheLevels";
import { StayUpToDate } from "../default/StayUpToDate";

export const MM4ContentCreator = () => (
    <Card heading={<h1>Content creator?</h1>}>
        <p>
            If you are a streamer, a YouTuber, a video game writer or in any other way a content creator, we have readied a Drive folder for you.
        </p>
        <p>
            Here you will find visual elements from the project: Logos, illustrations and other goodies. These are free to use for thumbnails, video overlays and other purposes. New elements will be released every week, so if you bookmark the folder you\u{2019}ll have access to these as soon as they are made available.
        </p>
        <Button
            icon="folder"
            to="https://drive.google.com/drive/folders/1PS6FRuYXR0V8Bgds3oIp2_Deur70drOc"
        >
            Open folder
        </Button>
    </Card>)

export const WelcomeContent = () => (
    <>
        <Card illustration type={'special'} heading={<h1>Welcome</h1>} subHeading={<h2>Come join us celebrate the anniversary of Super Mario Maker 2!</h2>}>
            <p>
                Again, Kiavik has recruited a top notch team for this annual get-together, and this will be the best level pack yet!</p>
            <p>
                For months, these levels have gone through strict auditions and rigorous playtesting to ensure you will have the best experience possible.
            </p>
            <p>
                Every level has a birthday cake for you to discover. Can you find them all?
            </p>
            <ToTheLevels />
        </Card>
        <MM4ContentCreator />
        <StayUpToDate />
    </>
);

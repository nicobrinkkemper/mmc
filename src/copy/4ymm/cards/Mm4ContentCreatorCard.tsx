import Button from "../../../components/Button";
import { Card } from "../../../components/Card";

export const MM4ContentCreatorCard = () => (
  <Card
    heading={`Content creator?`}
    subHeading={`We have readied a Drive folder for you.`}
  >
    <p>
      Here you will find visual elements from the project: Logos, illustrations
      and other goodies. These are free to use for thumbnails, video overlays
      and other purposes.
    </p>
    <Button
      icon="folder"
      to="https://drive.google.com/drive/folders/1PS6FRuYXR0V8Bgds3oIp2_Deur70drOc"
    >
      Open folder
    </Button>
  </Card>
);
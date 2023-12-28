import { Card } from "../../components/Card";
import { ToTheLevels } from "../../components/ToTheLevels";
import { StayUpToDate } from "../default/StayUpToDate";
import { MM4ContentCreatorCard } from "./cards/Mm4ContentCreatorCard";

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
        <MM4ContentCreatorCard />
        <StayUpToDate />
    </>
);

import { Card } from "../../components/Card";
import { ToTheLevels } from "../../components/ToTheLevels";
import { Ymm5ContentCreatorCard } from "../5ymm/Ymm5ContentCreatorCard";
import { StayUpToDate } from "../default/StayUpToDate";



export const Ymm6WelcomeContent = () => (
    <>
        <Card illustration type={'special'} heading={<h1>Six Years of Mario Maker</h1>} subHeading={<h2>It's time to do this thing again!</h2>}>
            <p>
                Since the release of Mario Maker, Kiavik has hosted an annual community project in order to push Mario Maker to the limit. This year is no different, every weekend the next couple of months we'll publish a batch of varied and rigorously playtested levels.
            </p>
            <p>
                Every level has a birthday cake for you to discover. Can you find them all?
            </p>
            <ToTheLevels />
        </Card>
        <Ymm5ContentCreatorCard />
        <StayUpToDate />
    </>
);

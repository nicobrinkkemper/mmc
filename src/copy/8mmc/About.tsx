import {
    Accordion
} from "react-accessible-accordion";
import { useTheme } from '../../theme/useTheme';
import { AboutItem } from "../default/AboutItem";
import { AboutItemHeading } from "../default/AboutItemHeading";
import { AboutPanel } from "../default/AboutPanel";
import { QuestionGetInTouch } from "../default/QuestionGetInTouch";
import { QuestionWhatKindOfLevels } from "../default/QuestionWhatKindOfLevels";


export const About = () => {
    const { info: { caps, snake, writtenOut, prevTheme }
    } = useTheme();
    return (
        <Accordion preExpanded={["what_is_" + snake]}>
            <h1>About {caps}</h1>
            <AboutItem>
                <AboutItemHeading>
                    What is {caps}?
                </AboutItemHeading>
                <AboutPanel>
                    {caps} is the {writtenOut} and the follow-up to {prevTheme?.toLocaleUpperCase()}. We celebrate the birthday of Mario Maker by getting together to create levels that demonstrate just what the game is capable of.
                </AboutPanel>
            </AboutItem>
            <QuestionWhatKindOfLevels />
            <QuestionGetInTouch />
        </Accordion>
    )
}

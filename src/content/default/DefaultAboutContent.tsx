
import {
    Accordion,
} from "react-accessible-accordion";
import { useTheme } from '../../theme/useTheme';
import { QuestionWhatIsThis } from './QuestionWhatIsThis';
import { QuestionGetInTouch } from './QuestionGetInTouch';
import { QuestionWhatKindOfLevels } from "./QuestionWhatKindOfLevels";


export const DefaultAboutContent = () => {
    const { info: { caps, snake } } = useTheme();
    return (
        <Accordion preExpanded={["what_is_" + snake]}>
            <h1>About {caps}</h1>
            <QuestionWhatIsThis />
            <QuestionWhatKindOfLevels />
            <QuestionGetInTouch />
        </Accordion>
    )
}

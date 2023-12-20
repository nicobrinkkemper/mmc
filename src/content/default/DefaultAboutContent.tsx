
import {
    Accordion,
} from "react-accessible-accordion";
import { useTheme } from '../../theme/useTheme';
import { QuestionWhatIsThis } from './QuestionWhatIsThis';
import { QuestionGetInTouch } from './QuestionGetInTouch';
import { QuestionWhatKindOfLevels } from "./QuestionWhatKindOfLevels";
import styles from './accordion.module.css';

export const DefaultAboutContent = () => {
    const { info: { caps, snake } } = useTheme();
    return (
        <Accordion className={styles.accordion} preExpanded={["what_is_" + snake]}>
            <h1>About {caps}</h1>
            <QuestionWhatIsThis />
            <QuestionWhatKindOfLevels />
            <QuestionGetInTouch />
        </Accordion>
    )
}

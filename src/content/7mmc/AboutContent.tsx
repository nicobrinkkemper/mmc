import {
  Accordion
} from "react-accessible-accordion";
import { useTheme } from '../../theme/useTheme';
import { AboutItem, AboutItemHeading, AboutPanel, QuestionGetInTouch, QuestionWhatKindOfLevels } from '../default/DefaultAboutContent';


const AboutContent = () => {
  const { info: { caps, snake, writtenOut }
  } = useTheme();
  return (
    <Accordion preExpanded={["what_is_" + snake]}>
      <h1>About {caps}</h1>
      <AboutItem>
        <AboutItemHeading>
          What is {caps}?
        </AboutItemHeading>
        <AboutPanel>
          {caps} is the {writtenOut} and the follow-up to the YMM project. After the original organizers retired from running the anniversary project, it was decided it was time for a rebranding and a reassessment of what the project should be about. But the main focus is still to celebrate the birthday of Mario Maker by getting together to create levels that demonstrate just what the game is capable of.
        </AboutPanel>
      </AboutItem>
      <QuestionWhatKindOfLevels />
      <QuestionGetInTouch />
    </Accordion>
  )
}

export { AboutContent }
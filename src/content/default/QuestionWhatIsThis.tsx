import { useTheme } from "../../theme/useTheme";
import { AboutItem } from "./AboutItem";
import { AboutItemHeading } from "./AboutItemHeading";
import { AboutPanel } from "./AboutPanel";

export const QuestionWhatIsThis = () => {
    const { info: { caps, writtenOut } } = useTheme();
    return (<AboutItem>
        <AboutItemHeading>
            What is {caps}?
        </AboutItemHeading>
        <AboutPanel>
            {caps} is the {writtenOut}. We celebrate Mario Maker by getting together to create levels that demonstrate just what the game is capable of.
        </AboutPanel>
    </AboutItem>)
}
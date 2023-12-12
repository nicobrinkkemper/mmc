import { snakeCase } from 'lodash';
import { PropsWithChildren } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel
} from "react-accessible-accordion";
import { useTheme } from '../../theme/useTheme';
export const AboutItemHeading = ({ children }: PropsWithChildren<{}>) => (
    <AccordionItemHeading>
        <AccordionItemButton>
            <h2>{children}</h2>
        </AccordionItemButton>
    </AccordionItemHeading>
);
export const AboutPanel = ({ children }: PropsWithChildren<Record<string, unknown>>) => (
    <AccordionItemPanel>
        <p>{children}</p>
    </AccordionItemPanel>
);
export const AboutItem = (props: PropsWithChildren<{}>) => {
    const header: any = Array.isArray(props.children) ? props.children[0] : null;
    if (!header) return header;
    const uuid = snakeCase(header.props.children)
    return <AccordionItem uuid={uuid}>{props.children}</AccordionItem>;
}

export const QuestionWhatKindOfLevels = () => (
    <AboutItem>
        <AboutItemHeading>
            So what kind of levels are these?
        </AboutItemHeading>
        <AboutPanel>
            The project's scope is broader than ever. You'll find platformers, gimmicks, puzzles, music levels, trolls and many more level types. Each maker plays to their own strengths to make an as accomplished, original and polished level they can. If you look into the weekly batches here on this website, you'll find short descriptions as well as category tags and a difficulty rating. This way you should be able to find something that suits you.
        </AboutPanel>
    </AboutItem>
)
export const QuestionGetInTouch = () => (
    <AboutItem>
        <AboutItemHeading>
            How can I get in touch?
        </AboutItemHeading>
        <AboutPanel>
            At the bottom of every page, you'll find a link to our Discord, Twitter page and YouTube channel. So if you have any questions or just want to see what's going on, mosey on over!
        </AboutPanel>
    </AboutItem>
)

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

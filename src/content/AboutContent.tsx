import { snakeCase } from 'lodash';
import { PropsWithChildren } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";

const AboutItemHeading = ({ children }: PropsWithChildren<{}>) => (
  <AccordionItemHeading>
    <AccordionItemButton>
      <h2>{children}</h2>
    </AccordionItemButton>
  </AccordionItemHeading>
);
const AboutPanel = ({ children }: PropsWithChildren<Record<string, unknown>>) => (
  <AccordionItemPanel>
    <p>{children}</p>
  </AccordionItemPanel>
);
const AboutItem = (props: PropsWithChildren<{}>) => {
  const header: any = Array.isArray(props.children) ? props.children[0] : null;
  if (!header) return header;
  const uuid = snakeCase(header.props.children)
  return <AccordionItem uuid={uuid}>{props.children}</AccordionItem>;
}

const AboutContent = () => {
  return (
    <Accordion preExpanded={["what_is_7_mmc"]}>
      <h1>About 7MMC</h1>
      <AboutItem>
        <AboutItemHeading>
          What is 7MMC?
        </AboutItemHeading>
        <AboutPanel>
          7MMC is the Seventh Mario Maker Celebration and the follow-up to the YMM project. After the original organizers retired from running the anniversary project, it was decided it was time for a rebranding and a reassessment of what the project should be about. But the main focus is still to celebrate the birthday of Mario Maker by getting together to create levels that demonstrate just what the game is capable of.
        </AboutPanel>
      </AboutItem>
      <AboutItem>
        <AboutItemHeading>
          So what kind of levels are these?
        </AboutItemHeading>
        <AboutPanel>
          The project's scope is broader than ever. You'll find platformers, gimmicks, puzzles, music levels, trolls and many more level types. Each maker plays to their own strengths to make an as accomplished, original and polished level they can. If you look into the weekly batches here on this website, you'll find short descriptions as well as category tags and a difficulty rating. This way you should be able to find something that suits you.
        </AboutPanel>
      </AboutItem>
      <AboutItem>
        <AboutItemHeading>
          How can I get in touch?
        </AboutItemHeading>
        <AboutPanel>
          At the bottom of every page, you'll find a link to our Discord, Twitter page and YouTube channel. So if you have any questions or just want to see what's going on, mosey on over!
        </AboutPanel>
      </AboutItem>
    </Accordion>
  )
}

export { AboutContent }
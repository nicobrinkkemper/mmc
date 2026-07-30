export const AboutPanel: AboutPanelType = ({
  children,
  accordionItemPanel: AccordionItemPanel,
}) => (
  <AccordionItemPanel>
    <p>{children}</p>
  </AccordionItemPanel>
);

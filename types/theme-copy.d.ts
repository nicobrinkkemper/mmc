declare global {
  type AccordionProps = {
    accordion: React.ElementType;
    accordionItem: React.ElementType;
    accordionItemHeading: React.ElementType;
    accordionItemButton: React.ElementType;
    accordionItemPanel: React.ElementType;
  };

  type AboutPanelType = ThemeComponent<
    {},
    "div",
    Pick<AccordionProps, "accordionItemPanel">
  >;

  type AboutItemType = ThemeComponent<
    {},
    "div",
    Pick<AccordionProps, "accordionItem">
  >;

  type AboutItemHeadingType = ThemeComponent<
    {},
    "div",
    Pick<AccordionProps, "accordionItemHeading" | "accordionItemButton">
  >;

  type DefaultWelcomeContentType = ThemeComponent<{
    info: ["writtenOut", "themeYear"];
    images: ["illustration"];
    pathInfo: ["theme", "toLevels"];
    clickable: true;
  }>;

  type DefaultAboutContentType = ThemeComponent<
    {
      pathInfo: ["theme"];
      info: ["caps", "snake", "writtenOut"];
    },
    "div",
    Pick<
      AccordionProps,
      | "accordion"
      | "accordionItem"
      | "accordionItemHeading"
      | "accordionItemButton"
      | "accordionItemPanel"
    >
  >;

  type QuestionWhatKindOfLevelsType = ThemeComponent<
    {},
    "div",
    Pick<
      AccordionProps,
      | "accordionItem"
      | "accordionItemHeading"
      | "accordionItemPanel"
      | "accordionItemButton"
    >
  >;

  type QuestionWhatIsThisType = ThemeComponent<
    {
      info: ["caps", "writtenOut"];
    },
    "div",
    Pick<
      AccordionProps,
      | "accordionItem"
      | "accordionItemHeading"
      | "accordionItemPanel"
      | "accordionItemButton"
    >
  >;

  type QuestionGetInTouchType = ThemeComponent<
    {},
    "div",
    Pick<
      AccordionProps,
      | "accordionItem"
      | "accordionItemHeading"
      | "accordionItemPanel"
      | "accordionItemButton"
    >
  >;

  type MarioTurnsXthType = ThemeComponent<{
    info: ["writtenOut", "themeYear"];
    images: ["illustration"];
    pathInfo: ["toLevels"];
    clickable: true;
  }>;

  type GenericCardType = ThemeComponent<{}>;
  type ClickableCardType = ThemeComponent<{
    clickable: true;
  }>;
  type StayUpToDateCardType = ClickableCardType;

  type CreditsContentCardType = ThemeComponent<{
    pathInfo: ["theme"];
    clickable: true;
  }>;

  type ContentCreatorCardType = ClickableCardType;

  type CreditsWebsiteCardType = ClickableCardType;

  type CreditsTrailerCardType = GenericCardType;
}

// prettier-ignore
export { };

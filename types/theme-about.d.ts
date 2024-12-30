declare global {
  type AboutPanelType = ThemeComponent<
    {},
    "div",
    {
      accordionItemPanel: React.ElementType;
    }
  >;

  type AboutItemType = ThemeComponent<
    {},
    "div",
    {
      accordionItem: React.ElementType;
    }
  >;

  type AboutItemHeadingType = ThemeComponent<
    {},
    "div",
    {
      accordionItemHeading: React.ElementType;
      accordionItemButton: React.ElementType;
    }
  >;

  type DefaultWelcomeContentType = ThemeComponent<{
    info: ["writtenOut", "themeYear"];
    images: ["illustration"];
    pathInfo: ["theme", "toLevels"];
    clickable: true;
  }>;

  type DefaultAboutContentType = ThemeComponent<
    {
      info: ["caps", "snake", "writtenOut"];
    },
    "div",
    {
      accordion: React.ElementType;
      accordionItem: React.ElementType;
      accordionItemHeading: React.ElementType;
      accordionItemButton: React.ElementType;
      accordionItemPanel: React.ElementType;
    }
  >;

  type QuestionWhatKindOfLevelsType = ThemeComponent<
    {},
    "div",
    {
      accordionItem: React.ElementType;
      accordionItemHeading: React.ElementType;
      accordionItemPanel: React.ElementType;
      accordionItemButton: React.ElementType;
    }
  >;

  type QuestionWhatIsThisType = ThemeComponent<
    {
      info: ["caps", "writtenOut"];
    },
    "div",
    {
      accordionItem: React.ElementType;
      accordionItemHeading: React.ElementType;
      accordionItemPanel: React.ElementType;
      accordionItemButton: React.ElementType;
    }
  >;

  type QuestionGetInTouchType = ThemeComponent<
    {},
    "div",
    {
      accordionItem: React.ElementType;
      accordionItemHeading: React.ElementType;
      accordionItemPanel: React.ElementType;
      accordionItemButton: React.ElementType;
    }
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

export {};

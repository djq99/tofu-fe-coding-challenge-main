export const ContentType = {
  LandingPage: "Landing Page",
  EmailMarketing: "Email - Marketing",
  EmailSDR: "Email - SDR",
  Whitepaper: "Whitepaper",
  Brochure: "Brochure",
  CaseStudy: "Case Study",
  EBook: "eBook",
  AdCampaignGeneral: "Ad Campaign - General",
  AdCampaignLinkedin: "Ad Campaign - LinkedIn",
  SocialGeneral: "Social - General",
  SocialLinkedin: "Social - LinkedIn",
  MessageLinkedin: "Message - LinkedIn",
  SalesDeck: "Sales Deck",
  Webinar: "Webinar",
  BlogPost: "Blog Post",
  QuotesHighlights: "Quotes and Highlights",
  Statistics: "Statistics",
  Other: "Other",
} as const;

export type ContentTypeKeys = keyof typeof ContentType;
export type ContentTypeValues = (typeof ContentType)[ContentTypeKeys];

export const ContentSourceUploadMethod = {
  URL: "Link",
  File: "File",
  Text: "Text",
} as const;

export type ContentSourceUploadMethodKeys =
  keyof typeof ContentSourceUploadMethod;
export type ContentSourceUploadMethodValues =
  (typeof ContentSourceUploadMethod)[ContentSourceUploadMethodKeys];

export const ContentSourceFormat = {
  Html: "Html",
  PDF: "PDF",
  Text: "Text",
  Empty: "",
} as const;

export type ContentSourceFormatKeys = keyof typeof ContentSourceFormat;
export type ContentSourceFormatValues =
  (typeof ContentSourceFormat)[ContentSourceFormatKeys];

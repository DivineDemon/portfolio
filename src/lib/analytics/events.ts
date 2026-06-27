export const ANALYTICS_EVENTS = {
  LEAD_FORM_SUBMIT: "lead_form_submit",
  LEAD_MAGNET_SUBMIT: "lead_magnet_submit",
  BOOKING_CLICK: "booking_click",
  CTA_CLICK: "cta_click",
  CASE_STUDY_CLICK: "case_study_click",
  CASE_STUDY_VIEW: "case_study_view",
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export type AnalyticsEventTier = "primary" | "engagement";

export type AnalyticsEventDefinition = {
  name: AnalyticsEventName;
  label: string;
  description: string;
  tier: AnalyticsEventTier;
  markAsKeyEvent: boolean;
  parameters: string[];
  firedFrom: string[];
};

export const ANALYTICS_EVENT_CATALOG: AnalyticsEventDefinition[] = [
  {
    name: ANALYTICS_EVENTS.LEAD_FORM_SUBMIT,
    label: "Lead form submit",
    description: "Contact form submission on the homepage.",
    tier: "primary",
    markAsKeyEvent: true,
    parameters: ["form_location"],
    firedFrom: ["Contact form"],
  },
  {
    name: ANALYTICS_EVENTS.LEAD_MAGNET_SUBMIT,
    label: "Lead magnet submit",
    description: "Email capture from a PDF or calculator lead magnet.",
    tier: "primary",
    markAsKeyEvent: true,
    parameters: [
      "magnet_slug",
      "magnet_title",
      "magnet_type",
      "annual_savings?",
    ],
    firedFrom: ["/resources lead magnets"],
  },
  {
    name: ANALYTICS_EVENTS.BOOKING_CLICK,
    label: "Booking click",
    description:
      "Click on the Calendly or booking link in the contact section.",
    tier: "primary",
    markAsKeyEvent: true,
    parameters: ["link_url", "cta_location"],
    firedFrom: ["Contact booking link"],
  },
  {
    name: ANALYTICS_EVENTS.CTA_CLICK,
    label: "CTA click",
    description: "Primary call-to-action clicks in the hero and navigation.",
    tier: "engagement",
    markAsKeyEvent: true,
    parameters: ["cta_label", "cta_location"],
    firedFrom: ["Hero", "Navbar", "Tracked links"],
  },
  {
    name: ANALYTICS_EVENTS.CASE_STUDY_CLICK,
    label: "Case study click",
    description: "Click through to a project or workflow case study.",
    tier: "engagement",
    markAsKeyEvent: true,
    parameters: ["content_type", "item_slug", "item_title"],
    firedFrom: ["Projects grid", "Workflows grid", "CMS pages", "Related work"],
  },
  {
    name: ANALYTICS_EVENTS.CASE_STUDY_VIEW,
    label: "Case study view",
    description: "Detail page view for a project or workflow case study.",
    tier: "engagement",
    markAsKeyEvent: true,
    parameters: ["content_type", "item_slug", "item_title"],
    firedFrom: ["Project detail", "Workflow detail"],
  },
];

export const PRIMARY_KEY_EVENTS = ANALYTICS_EVENT_CATALOG.filter(
  (event) => event.tier === "primary",
);

export const ENGAGEMENT_KEY_EVENTS = ANALYTICS_EVENT_CATALOG.filter(
  (event) => event.tier === "engagement",
);

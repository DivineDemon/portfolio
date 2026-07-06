export const ANALYTICS_EVENTS = {
  LEAD_FORM_SUBMIT: "lead_form_submit",
  BOOKING_CLICK: "booking_click",
  CTA_CLICK: "cta_click",
  CASE_STUDY_CLICK: "case_study_click",
  CASE_STUDY_VIEW: "case_study_view",
  WEB_VITAL: "web_vital",
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export const ANALYTICS_EVENTS = {
  GENERATE_LEAD: "generate_lead",
  LEAD_FORM_SUBMIT: "lead_form_submit",
  BOOKING_CLICK: "booking_click",
  CTA_CLICK: "cta_click",
  CASE_STUDY_CLICK: "case_study_click",
  CASE_STUDY_VIEW: "case_study_view",
  BLOG_POST_CLICK: "blog_post_click",
  BLOG_POST_VIEW: "blog_post_view",
  BLOG_CTA_CLICK: "blog_cta_click",
  NAV_CLICK: "nav_click",
  WEB_VITAL: "web_vital",
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export type FaqItem = {
  question: string;
  answer: string;
};

/** Keep in sync with the FAQ section in content/pages/about.mdx */
export const ABOUT_FAQ_ITEMS: FaqItem[] = [
  {
    question: "When should a founder hire a fractional CTO?",
    answer:
      "When you need senior technical leadership — architecture decisions, AI integration strategy, hiring bar-setting, or production reliability — but a full-time CTO isn't justified yet. Typical triggers: pre-Series A with a growing engineering team, a critical platform rewrite, or shipping AI/automation into production without burning runway on the wrong bets.",
  },
  {
    question:
      "Should we build custom AI and automation or buy off-the-shelf tools?",
    answer:
      "Buy when a mature product solves 80% of the problem with acceptable integration cost. Build when your workflow, data, or compliance requirements are specific enough that glue-code and workarounds cost more than ownership — common with RAG over proprietary knowledge, multi-step sales ops, and regulated HealthTech or FinTech pipelines. I help founders run that build-vs-buy analysis before anyone writes code.",
  },
  {
    question: "What does production-ready AI actually look like?",
    answer:
      "Measurable outcomes, not demos: retrieval quality you can audit, agent task success rates, human-in-the-loop fallbacks, cost per request, and monitoring when models drift. Production AI means the system still works on Tuesday when traffic spikes — not a prompt that looked good in a slide deck.",
  },
  {
    question: "What kinds of problems do you take on?",
    answer:
      "RAG and agentic systems over messy institutional knowledge, fullstack SaaS platforms that need to survive real users, n8n and workflow automation that moves revenue metrics, and fractional CTO advisory for founders who need a technical co-pilot. If the success metric is a business number — fewer tickets, faster deploys, more qualified leads — we're aligned.",
  },
  {
    question: "How do engagements typically work?",
    answer:
      'We start by defining what "solved" looks like in numbers, then I own architecture through deployment — hands-on building, not slide-deck consulting. Engagements range from focused build sprints to ongoing fractional CTO partnerships. If you have a real problem and want someone who treats it like their own business, start with a conversation via the contact page.',
  },
];

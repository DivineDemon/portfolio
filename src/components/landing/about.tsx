import MaxWidthWrapper from "@/components/ui/max-width-wrapper";

const About = () => {
  return (
    <MaxWidthWrapper parentBorder="border-b">
      <div
        id="about"
        className="w-full flex flex-col items-center justify-center gap-5 p-5 font-mono text-sm"
      >
        <span className="w-full text-left">
          I work with founders and operators who need software built right the
          first time — without growing a full engineering department to do it.
        </span>
        <span className="w-full text-left">
          Over the past 5+ years, I have led the design and delivery of
          production-grade platforms across FinTech, healthcare, real estate,
          and AI-driven products. The common thread is turning messy operational
          problems into systems that hold up as the business grows — with
          security and long-term maintainability built in from day one.
        </span>
        <div className="w-full flex flex-col items-center justify-center gap-1.5">
          <span className="w-full text-left">That means:</span>
          <ul className="list-disc list-inside w-full text-left">
            <li>
              Platforms that scale without expensive rewrites as usage and
              complexity grow.
            </li>
            <li>
              Business objectives translated into systems that stay reliable
              under real operational load.
            </li>
            <li>
              Cross-functional leadership so delivery stays on track and systems
              stay coherent.
            </li>
            <li>
              AI and automation that cut manual work and operating cost (OpenAI,
              LangChain, n8n).
            </li>
          </ul>
        </div>
        <span className="w-full text-left">
          I have delivered measurable impact — from double-digit increases in
          lead generation and retention to backend performance gains and
          automation-driven cost reductions.
        </span>
        <div className="w-full flex flex-col items-center justify-center gap-1.5">
          <span className="w-full text-left">How we can work together:</span>
          <ul className="list-disc list-inside w-full text-left">
            <li>
              Project-based engagements — scoped builds with clear milestones
              and defined outcomes.
            </li>
            <li>
              Ongoing development — sustained product work as your platform and
              team evolve.
            </li>
            <li>
              Fractional and advisory — technical leadership, architecture
              direction, and execution oversight without a full-time hire.
            </li>
          </ul>
        </div>
        <span className="w-full text-left">
          I approach every project with a founder&apos;s mindset: clarity of
          vision, structured execution, and systems built to compound over time.
          Complex requirements don&apos;t intimidate me — they become systems
          that work for the business.
        </span>
      </div>
    </MaxWidthWrapper>
  );
};

export default About;

import MaxWidthWrapper from "@/components/ui/max-width-wrapper";

const About = () => {
  return (
    <MaxWidthWrapper parentBorder="border-b">
      <div
        id="about"
        className="w-full flex flex-col items-center justify-center gap-5 p-5 font-mono text-sm"
      >
        <span className="w-full text-left">
          I am a Senior Full-Stack Software Engineer and Product Architect
          specializing in scalable SaaS development, AI-powered automation
          systems, and modern TypeScript ecosystems.
        </span>
        <span className="w-full text-left">
          Over the past 5+ years, I have led the design and delivery of
          production-grade platforms across FinTech, healthcare, real estate,
          and AI-driven products. My work spans modern frontends (Next.js,
          React), robust backends (Node.js, Python), and SaaS platforms that
          scale with your business — without costly rewrites — with security and
          long-term maintainability built in.
        </span>
        <span className="w-full text-left">
          I operate beyond feature delivery.
        </span>
        <span className="w-full text-left">
          I design systems that support growth.
        </span>
        <div className="w-full flex flex-col items-center justify-center gap-1.5">
          <span className="w-full text-left">That means:</span>
          <ul className="list-disc list-inside w-full text-left">
            <li>
              Designing scalable SaaS platforms that handle growth without
              expensive rewrites.
            </li>
            <li>
              Turning business objectives into systems that stay reliable as you
              scale.
            </li>
            <li>
              Leading cross-functional teams so delivery stays on track and
              systems stay coherent.
            </li>
            <li>
              Building AI and automation that cut manual work and cost (OpenAI,
              LangChain, n8n).
            </li>
          </ul>
        </div>
        <span className="w-full text-left">
          I have delivered measurable impact — from double-digit increases in
          lead generation and retention to backend performance gains and
          automation-driven cost reductions.
        </span>
        <span className="w-full text-left">
          I approach every project with a founder's mindset: clarity of vision,
          structured execution, and systems built to compound over time.
        </span>
        <span className="w-full text-left">
          Complex requirements don't intimidate me — they become systems that
          work for the business.
        </span>
      </div>
    </MaxWidthWrapper>
  );
};

export default About;

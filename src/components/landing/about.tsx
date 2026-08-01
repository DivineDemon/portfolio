import { X } from "lucide-react";
import MaxWidthWrapper from "../max-width-wrapper";
import Quote from "../ui/quote";
import SectionBadge from "../ui/section-badge";

const About = () => {
  return (
    <MaxWidthWrapper
      className="flex min-h-screen w-full flex-col items-center justify-center gap-10"
      id="about"
    >
      <div className="flex w-full flex-col items-start justify-center gap-5">
        <SectionBadge label="about" />
        <h2 className="w-full text-left font-bold text-7xl">
          Inference is easy. Everything else isn't.
        </h2>
        <Quote text="Honest where it matters. Available when it's hard." />
      </div>
      <p className="w-full text-left text-sm">
        As a Senior AI Engineer and Founder of&nbsp;
        <strong className="font-semibold text-primary">Haga</strong>, I specialize in building
        enterprise agentic systems, <strong className="font-semibold text-primary">LLM</strong>
        &nbsp; fine-tuning, and high-throughput inference architecture. My engineering focus centers
        on what surrounds generative models: multi-agent state orchestration, low-latency streaming
        pipelines, and <strong className="font-semibold text-primary">GPU</strong> memory
        optimization. Rather than relying on simple API wrappers, I architect production AI
        infrastructure — from on-prem <strong className="font-semibold text-primary">QLoRA</strong>
        &nbsp; model tuning to <strong className="font-semibold text-primary">sub-200ms</strong>
        &nbsp; real-time decision systems.
      </p>
      <p className="w-full text-left text-sm">
        Across <strong className="font-semibold text-primary">7 years</strong> at Afiniti and
        Confiz, I architected a <strong className="font-semibold text-primary">6-agent</strong>
        &nbsp;
        <strong className="font-semibold text-primary">LangGraph</strong> document processing
        pipeline cutting manual turnaround by&nbsp;
        <strong className="font-semibold text-primary">92%</strong> (
        <strong className="font-semibold text-primary">3 days to &lt;4 hours</strong>), deployed
        streaming fraud detection handling&nbsp;
        <strong className="font-semibold text-primary">1.2M+</strong> daily transactions at&nbsp;
        <strong className="font-semibold text-primary">&lt;180ms p95</strong> latency, and scaled
        bilingual RAG engines <strong className="font-semibold text-primary">8&times;</strong> using
        async <strong className="font-semibold text-primary">FastAPI</strong> and&nbsp;
        <strong className="font-semibold text-primary">FAISS</strong> vector search. Today at&nbsp;
        <strong className="font-semibold text-primary">Haga</strong>, I am advancing physical AI by
        building the independent trust and physics-consistency verification layer for robot learning
        policies and generative world models.
      </p>
      <div className="grid w-full grid-cols-1 items-center justify-center gap-5 md:grid-cols-2">
        <div className="flex h-full w-full flex-col items-start justify-start gap-2.5 rounded-2xl border p-5 shadow">
          <h3 className="w-full text-left font-semibold text-primary text-xl">
            Inference as a System
          </h3>
          <span className="w-full text-left text-sm">
            Most teams ship inference as a function call. The real questions -&nbsp;
            <strong className="font-semibold text-primary">p95 latency</strong>,&nbsp;
            <strong className="font-semibold text-primary">10x load</strong>, what happens when a
            backend goes down - are architecture questions. I answer them before the first model
            goes live.
          </span>
        </div>
        <div className="flex h-full w-full flex-col items-start justify-start gap-2.5 rounded-2xl border p-5 shadow">
          <h3 className="w-full text-left font-semibold text-primary text-xl">
            Physics-Informed Scientific ML
          </h3>
          <span className="w-full text-left text-sm">
            Data-driven physics models aren't data problems - they're structure problems. Ignoring
            governing equations forces the model to rediscover physics from data it may never have
            enough of. Embedding <strong className="font-semibold text-primary">PDEs</strong> into
            the objective is what makes sparse data sufficient.
          </span>
        </div>
        <div className="col-span-2 flex w-full flex-col items-center justify-center gap-3 rounded-2xl border p-5 shadow">
          <h3 className="w-full text-left font-semibold text-primary text-xl">What I don't do</h3>
          <ul className="flex w-full flex-col gap-2.5 text-sm">
            <li className="flex items-start gap-2.5 rounded-xl border border-border/50 bg-muted/30 p-3 transition-colors hover:bg-muted/50">
              <X className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                I don't ship AI wrappers dressed as products. Core&nbsp;
                <strong className="font-semibold text-primary">API</strong> calls with a nice UI
                aren't systems.
              </span>
            </li>
            <li className="flex items-start gap-2.5 rounded-xl border border-border/50 bg-muted/30 p-3 transition-colors hover:bg-muted/50">
              <X className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                I don't build for its own sake. The system has to earn what it costs to run.
              </span>
            </li>
            <li className="flex items-start gap-2.5 rounded-xl border border-border/50 bg-muted/30 p-3 transition-colors hover:bg-muted/50">
              <X className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                I don't take off-the-shelf work. If the implementation is a Google search away, I'm
                not the right person.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default About;

import LogoDark from "@/assets/img/logo-dark.svg";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Open Graph Poster Generator — Mushood Hanif",
  path: "/og-poster",
  noIndex: true,
});

const OgPosterPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#050507] p-8 text-white">
      <div className="mb-6 flex flex-col items-center gap-2 text-center">
        <h1 className="font-bold font-heading text-2xl text-white">
          Open Graph Poster Preview (1200px × 630px)
        </h1>
        <p className="max-w-xl text-sm text-zinc-400">
          This card is rendered at exact 1200×630 dimensions using your brand colors, Fraunces/Inter
          fonts, logo, and metrics. Screenshot the box below to update{" "}
          <code className="font-mono text-primary">/public/og-image.png</code>.
        </p>
      </div>

      <div
        className="relative flex select-none flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800 bg-[#0c0c0f] p-12 shadow-2xl"
        id="og-card"
        style={{ width: 1200, height: 630 }}
      >
        <div className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-[#c23030]/20 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 -bottom-32 size-96 rounded-full bg-[#c23030]/15 blur-[120px]" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-950/10 blur-[150px]" />

        <div className="relative z-10 flex items-center justify-between border-zinc-800/80 border-b pb-6">
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl border border-zinc-700/80 bg-zinc-900/90 p-2.5 shadow-md">
              <img
                alt="Mushood Hanif Logo"
                className="size-full object-contain"
                height={56}
                src={LogoDark.src}
                width={56}
              />
            </div>
            <div className="flex flex-col">
              <div className="font-bold font-heading text-3xl text-white tracking-tight">
                Mushood <span className="text-[#c23030]">Hanif</span>
              </div>
              <div className="mt-0.5 font-mono text-xs text-zinc-400 uppercase tracking-widest">
                AI Systems Architect & Senior AI Engineer
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-[#c23030]/40 bg-[#c23030]/10 px-5 py-2">
            <div className="size-2.5 animate-pulse rounded-full bg-[#c23030]" />
            <span className="font-mono font-semibold text-[#e53838] text-xs uppercase tracking-wider">
              Founder @ Haga Labs
            </span>
          </div>
        </div>

        <div className="relative z-10 my-auto flex flex-col gap-4 py-4">
          <div className="w-fit rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-1 font-mono text-xs text-zinc-400 uppercase tracking-widest">
            Production AI & Physical Systems
          </div>

          <h2 className="max-w-5xl font-extrabold font-heading text-5xl text-white leading-[1.18] tracking-tight">
            Building Multi-Agent Systems, High-Throughput ML Pipelines & Physical AI.
          </h2>

          <p className="max-w-3xl text-lg text-zinc-400 leading-relaxed">
            Specializing in LangGraph orchestration, on-prem QLoRA LLM fine-tuning, real-time
            streaming fraud scoring, and robot policy verification.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-6 border-zinc-800/80 border-t pt-6">
          <div className="flex flex-col gap-1 rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-4 backdrop-blur-md">
            <div className="font-bold font-heading text-3xl text-[#c23030]">92% Processing Cut</div>
            <div className="font-medium text-xs text-zinc-400">Multi-Agent LangGraph System</div>
          </div>

          <div className="flex flex-col gap-1 rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-4 backdrop-blur-md">
            <div className="font-bold font-heading text-3xl text-white">1.2M+ Daily Events</div>
            <div className="font-medium text-xs text-zinc-400">
              Real-Time Streaming (&lt;180ms Latency)
            </div>
          </div>

          <div className="flex flex-col gap-1 rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-4 backdrop-blur-md">
            <div className="font-bold font-heading text-3xl text-[#c23030]">
              100% Physics Precision
            </div>
            <div className="font-medium text-xs text-zinc-400">MuJoCo World Model Verifier</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OgPosterPage;

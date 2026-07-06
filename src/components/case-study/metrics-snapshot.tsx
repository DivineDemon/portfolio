import {
  getMetricEntries,
  parseProjectMetrics,
} from "@/components/case-study/utils";

export function MetricsSnapshot({ metrics }: { metrics: unknown }) {
  const entries = getMetricEntries(parseProjectMetrics(metrics));
  if (!entries.length) return null;

  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-heading text-xl font-semibold text-foreground">
        Metrics
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {entries.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col items-start justify-start border border-border bg-muted/30"
          >
            <p className="w-full border-b border-border p-3 font-mono text-xs uppercase text-muted-foreground">
              {label}
            </p>
            <p className="p-3 font-mono text-lg font-semibold tracking-tight text-foreground capitalize">
              {value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

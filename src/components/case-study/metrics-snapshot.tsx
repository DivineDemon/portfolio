import {
  getMetricEntries,
  parseProjectMetrics,
} from "@/components/case-study/utils";

export function MetricsSnapshot({ metrics }: { metrics: unknown }) {
  const entries = getMetricEntries(parseProjectMetrics(metrics));
  if (!entries.length) return null;

  return (
    <section className="border-y p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {entries.map(({ label, value }) => (
          <div
            key={label}
            className="rounded-lg border border-border bg-muted/30 text-center flex flex-col items-center justify-start"
          >
            <p className="font-mono text-xs text-muted-foreground uppercase p-3 border-b w-full">
              {label}
            </p>
            <p className="font-mono text-lg font-semibold tracking-tight text-foreground p-3 capitalize">
              {value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

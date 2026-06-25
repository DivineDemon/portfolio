import {
  getMetricEntries,
  parseProjectMetrics,
} from "@/components/case-study/utils";

export function MetricsSnapshot({ metrics }: { metrics: unknown }) {
  const entries = getMetricEntries(parseProjectMetrics(metrics));
  if (!entries.length) return null;

  return (
    <section className="border-b p-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {entries.map(({ label, value }) => (
          <div
            key={label}
            className="rounded-lg border border-border bg-muted/30 px-4 py-3 text-center"
          >
            <p className="font-mono text-lg font-semibold tracking-tight text-foreground md:text-xl">
              {value}
            </p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

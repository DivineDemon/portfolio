type ProjectMetrics = Record<string, unknown>;

type ProjectMetricValue = string | number | boolean | string[] | null;

export function parseProjectMetrics(metrics: unknown): ProjectMetrics {
  if (!metrics || typeof metrics !== "object" || Array.isArray(metrics)) {
    return {};
  }
  return metrics as ProjectMetrics;
}

export function formatMetricValue(value: ProjectMetricValue): string {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

export function formatMetricLabel(key: string): string {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getMetricEntries(
  metrics: ProjectMetrics,
): Array<{ label: string; value: string }> {
  return Object.entries(metrics)
    .filter(
      ([, value]) => value !== null && value !== undefined && value !== "",
    )
    .map(([key, value]) => ({
      label: formatMetricLabel(key),
      value: formatMetricValue(value as ProjectMetricValue),
    }));
}

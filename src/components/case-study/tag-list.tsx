import { cn } from "@/lib/utils";

export function TagList({ items, title }: { items: string[]; title?: string }) {
  if (!items.length) return null;

  return (
    <div className="flex flex-col gap-2">
      {title ? (
        <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </h3>
      ) : null}
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className={cn(
              "border border-border bg-muted/50 px-2 py-1 font-mono text-xs text-muted-foreground",
            )}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

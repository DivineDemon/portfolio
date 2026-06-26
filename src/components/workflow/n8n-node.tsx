"use client";

import { Handle, type Node, type NodeProps, Position } from "@xyflow/react";
import { GitBranch, Plug, Shuffle, Zap } from "lucide-react";
import type { N8nNodeCategory } from "@/lib/n8n/to-react-flow";
import { cn } from "@/lib/utils";

export type N8nFlowNode = Node<
  {
    label: string;
    nodeType: string;
    category: N8nNodeCategory;
  },
  "n8n"
>;

const categoryStyles: Record<
  N8nNodeCategory,
  { border: string; accent: string; icon: typeof Zap }
> = {
  trigger: {
    border: "border-emerald-500/60",
    accent: "text-emerald-400",
    icon: Zap,
  },
  transform: {
    border: "border-sky-500/60",
    accent: "text-sky-400",
    icon: Shuffle,
  },
  integration: {
    border: "border-violet-500/60",
    accent: "text-violet-400",
    icon: Plug,
  },
  logic: {
    border: "border-amber-500/60",
    accent: "text-amber-400",
    icon: GitBranch,
  },
};

export function N8nNode({ data }: NodeProps<N8nFlowNode>) {
  const styles = categoryStyles[data.category] ?? categoryStyles.integration;
  const Icon = styles.icon;

  return (
    <div
      className={cn(
        "min-w-[160px] max-w-[220px] rounded-lg border bg-[#1a1a2e] px-3 py-2.5 shadow-lg",
        styles.border,
      )}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!size-2 !border-2 !border-[#2d2d44] !bg-[#4a4a6a]"
      />
      <div className="flex items-start gap-2">
        <Icon className={cn("mt-0.5 size-3.5 shrink-0", styles.accent)} />
        <div className="min-w-0">
          <p className="truncate font-mono text-xs font-medium text-zinc-100">
            {data.label}
          </p>
          <p className="truncate font-mono text-[10px] text-zinc-500">
            {data.nodeType}
          </p>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="!size-2 !border-2 !border-[#2d2d44] !bg-[#4a4a6a]"
      />
    </div>
  );
}

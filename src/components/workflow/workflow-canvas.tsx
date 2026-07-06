"use client";

import {
  Background,
  BackgroundVariant,
  type ColorMode,
  Controls,
  type Edge,
  ReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useState } from "react";
import { type N8nFlowNode, N8nNode } from "@/components/workflow/n8n-node";
import type { ReactFlowGraph } from "@/lib/n8n/to-react-flow";
import { cn } from "@/lib/utils";

const nodeTypes = { n8n: N8nNode };

type WorkflowCanvasProps = {
  graph: ReactFlowGraph;
  className?: string;
};

function preventClipboardEvent(event: React.ClipboardEvent) {
  event.preventDefault();
}

function WorkflowCanvasInner({ graph, className }: WorkflowCanvasProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const nodes = graph.nodes as N8nFlowNode[];
  const edges = graph.edges as Edge[];

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const colorMode: ColorMode = isDark ? "dark" : "light";

  const handleContextMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
    },
    [],
  );

  const defaultEdgeOptions = useMemo(
    () => ({
      style: {
        stroke: isDark ? "var(--muted-foreground)" : "var(--border)",
        strokeWidth: 2,
      },
      type: "smoothstep" as const,
    }),
    [isDark],
  );

  const flowProps = useMemo(
    () => ({
      nodes,
      edges,
      nodeTypes,
      defaultEdgeOptions,
      nodesDraggable: false,
      nodesConnectable: false,
      elementsSelectable: false,
      nodesFocusable: false,
      edgesFocusable: false,
      selectNodesOnDrag: false,
      panOnDrag: true,
      zoomOnScroll: true,
      fitView: true,
      fitViewOptions: { padding: 0.2 },
      minZoom: 0.2,
      maxZoom: 1.5,
      colorMode,
    }),
    [nodes, edges, defaultEdgeOptions, colorMode],
  );

  return (
    <section
      aria-label="Interactive workflow diagram"
      className={cn(
        "relative h-[500px] min-h-[500px] w-full overflow-hidden rounded-lg border border-border bg-muted",
        "select-none [-webkit-user-select:none]",
        "[&_.react-flow__controls]:border-border [&_.react-flow__controls]:bg-card",
        "[&_.react-flow__controls-button]:border-border [&_.react-flow__controls-button]:bg-card",
        "[&_.react-flow__controls-button]:fill-muted-foreground",
        "[&_.react-flow__controls-button:hover]:bg-accent",
        className,
      )}
      onContextMenu={handleContextMenu}
      onCopy={preventClipboardEvent}
      onCut={preventClipboardEvent}
    >
      {nodes.length === 0 ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted">
          <p className="font-mono text-sm text-muted-foreground">
            No workflow nodes to display.
          </p>
        </div>
      ) : (
        <ReactFlow {...flowProps}>
          <Background
            variant={BackgroundVariant.Dots}
            gap={16}
            size={1}
            color={isDark ? "var(--border)" : "var(--muted-foreground)"}
            className="opacity-40"
          />
          <Controls showInteractive={false} />
        </ReactFlow>
      )}
    </section>
  );
}

export function WorkflowCanvas(props: WorkflowCanvasProps) {
  return (
    <ReactFlowProvider>
      <WorkflowCanvasInner {...props} />
    </ReactFlowProvider>
  );
}

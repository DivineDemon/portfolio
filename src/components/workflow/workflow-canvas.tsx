"use client";

import {
  Background,
  BackgroundVariant,
  Controls,
  type Edge,
  ReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { type N8nFlowNode, N8nNode } from "@/components/workflow/n8n-node";
import type { ReactFlowGraph } from "@/lib/n8n/to-react-flow";
import { cn } from "@/lib/utils";

const nodeTypes = { n8n: N8nNode };

const defaultEdgeOptions = {
  style: { stroke: "#4a4a6a", strokeWidth: 2 },
  type: "smoothstep" as const,
};

type WorkflowCanvasProps = {
  slug: string;
  className?: string;
};

function preventClipboardEvent(event: React.ClipboardEvent) {
  event.preventDefault();
}

function WorkflowCanvasInner({ slug, className }: WorkflowCanvasProps) {
  const [nodes, setNodes] = useState<N8nFlowNode[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    let cancelled = false;

    async function loadGraph() {
      setStatus("loading");

      try {
        const response = await fetch(`/api/workflow/${slug}/graph`);
        if (!response.ok) throw new Error("Failed to load workflow graph");

        const graph = (await response.json()) as ReactFlowGraph | null;
        if (cancelled) return;

        if (!graph?.nodes?.length) {
          setNodes([]);
          setEdges([]);
          setStatus("ready");
          return;
        }

        setNodes(graph.nodes as N8nFlowNode[]);
        setEdges(graph.edges);
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    void loadGraph();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const handleContextMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
    },
    [],
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
      colorMode: "dark" as const,
    }),
    [nodes, edges],
  );

  return (
    <section
      aria-label="Interactive workflow diagram"
      className={cn(
        "relative h-[500px] min-h-[500px] w-full overflow-hidden rounded-lg border border-border bg-[#0f0f1a]",
        "select-none [-webkit-user-select:none]",
        className,
      )}
      onContextMenu={handleContextMenu}
      onCopy={preventClipboardEvent}
      onCut={preventClipboardEvent}
    >
      {status === "loading" && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0f0f1a]">
          <p className="font-mono text-sm text-zinc-500">Loading workflow…</p>
        </div>
      )}

      {status === "error" && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0f0f1a]">
          <p className="font-mono text-sm text-zinc-500">
            Unable to load workflow graph.
          </p>
        </div>
      )}

      {status === "ready" && nodes.length === 0 && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0f0f1a]">
          <p className="font-mono text-sm text-zinc-500">
            No workflow nodes to display.
          </p>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden">
        <span
          aria-hidden
          className="rotate-[-18deg] font-mono text-lg text-white/5 md:text-2xl"
        >
          Mushood Hanif — n8n Creator
        </span>
      </div>

      {status === "ready" && nodes.length > 0 && (
        <ReactFlow {...flowProps}>
          <Background
            variant={BackgroundVariant.Dots}
            gap={16}
            size={1}
            color="#2a2a3e"
          />
          <Controls
            showInteractive={false}
            className="!border-[#2d2d44] !bg-[#1a1a2e] [&>button]:!border-[#2d2d44] [&>button]:!bg-[#1a1a2e] [&>button]:!fill-zinc-400 [&>button:hover]:!bg-[#252538]"
          />
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

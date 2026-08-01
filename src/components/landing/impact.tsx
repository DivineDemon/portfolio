import type * as d3Force from "d3-force";
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
} from "d3-force";
import { useCallback, useEffect, useRef, useState } from "react";
import MaxWidthWrapper from "../max-width-wrapper";
import SectionBadge from "../ui/section-badge";
import {
  GRAPH_CONFIG,
  GRAPH_LINKS,
  GRAPH_NODES,
  type GraphLink,
  type GraphNode,
} from "./constants";

const Impact = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const nodesRef = useRef<GraphNode[]>(JSON.parse(JSON.stringify(GRAPH_NODES)));
  const linksRef = useRef<GraphLink[]>(JSON.parse(JSON.stringify(GRAPH_LINKS)));
  const simulationRef = useRef<d3Force.Simulation<GraphNode, GraphLink> | null>(null);

  const initSimulation = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width;
    const height = canvas.height;

    const hubs = nodesRef.current.filter((n) => n.type === "hub");
    const hubCount = hubs.length;
    const radius = Math.min(width, height) * 0.4;

    hubs.forEach((hub, i) => {
      const angle = (i * 2 * Math.PI) / hubCount - Math.PI / 2;
      hub.x = width / 2 + radius * Math.cos(angle);
      hub.y = height / 2 + radius * Math.sin(angle);
    });

    nodesRef.current.forEach((node) => {
      if (node.type === "leaf") {
        const link = linksRef.current.find((l) => {
          const targetId = typeof l.target === "object" ? l.target.id : l.target;
          return targetId === node.id;
        });
        if (link) {
          const sourceId = typeof link.source === "object" ? link.source.id : link.source;
          const hub = nodesRef.current.find((n) => n.id === sourceId);
          if (hub && hub.x !== undefined && hub.y !== undefined) {
            const offsetAngle = Math.random() * 2 * Math.PI;
            const offsetDist = 90 + Math.random() * 80;
            node.x = hub.x + offsetDist * Math.cos(offsetAngle);
            node.y = hub.y + offsetDist * Math.sin(offsetAngle);
          }
        }
      }
    });

    if (simulationRef.current) {
      simulationRef.current.stop();
    }

    const sim = forceSimulation<GraphNode, GraphLink>(nodesRef.current)
      .force(
        "link",
        forceLink<GraphNode, GraphLink>(linksRef.current)
          .id((d) => d.id)
          .distance((d) => {
            const source = d.source as GraphNode;
            const target = d.target as GraphNode;
            if (source.type === "hub" && target.type === "hub") {
              return GRAPH_CONFIG.hubDistance;
            }
            return GRAPH_CONFIG.leafDistance;
          })
          .strength(GRAPH_CONFIG.linkStrength),
      )
      .force("charge", forceManyBody<GraphNode>().strength(GRAPH_CONFIG.chargeStrength))
      .force("center", forceCenter(width / 2, height / 2).strength(0.03))
      .force(
        "collide",
        forceCollide<GraphNode>().radius((d) =>
          d.type === "hub" ? GRAPH_CONFIG.collideHubRadius : GRAPH_CONFIG.collideLeafRadius,
        ),
      )
      .force("x", forceX(width / 2).strength(0.015))
      .force("y", forceY(height / 2).strength(0.015));

    simulationRef.current = sim;
    sim.alpha(1).restart();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const canvasHeight = Math.max(800, rect.width * 0.65);

      canvas.width = rect.width * dpr;
      canvas.height = canvasHeight * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${canvasHeight}px`;

      initSimulation();
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (simulationRef.current) simulationRef.current.stop();
    };
  }, [initSimulation]);

  useEffect(() => {
    let animationFrameId: number;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width;
      const height = canvas.height;

      const paddingX = 60 * dpr;
      const paddingY = 40 * dpr;
      nodesRef.current.forEach((node) => {
        if (node.x !== undefined) {
          node.x = Math.max(paddingX, Math.min(width - paddingX, node.x));
        }
        if (node.y !== undefined) {
          node.y = Math.max(paddingY, Math.min(height - paddingY, node.y));
        }
      });

      ctx.save();

      ctx.clearRect(0, 0, width, height);

      const activeHover = hoveredNode;
      const connectedNodeIds = new Set<string>();
      if (activeHover) {
        connectedNodeIds.add(activeHover.id);
        linksRef.current.forEach((link) => {
          const sourceId = typeof link.source === "object" ? link.source.id : link.source;
          const targetId = typeof link.target === "object" ? link.target.id : link.target;
          if (sourceId === activeHover.id) connectedNodeIds.add(targetId);
          if (targetId === activeHover.id) connectedNodeIds.add(sourceId);
        });
      }

      linksRef.current.forEach((link) => {
        const source = link.source as GraphNode;
        const target = link.target as GraphNode;
        if (
          source.x === undefined ||
          source.y === undefined ||
          target.x === undefined ||
          target.y === undefined
        )
          return;

        const isConnected =
          activeHover && (source.id === activeHover.id || target.id === activeHover.id);

        const isHubMesh = source.type === "hub" && target.type === "hub";

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);

        if (isConnected) {
          ctx.strokeStyle = activeHover.color;
          ctx.lineWidth = 2 * dpr;
          ctx.globalAlpha = 0.95;
        } else if (isHubMesh) {
          ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)";
          ctx.lineWidth = 1 * dpr;
          ctx.globalAlpha = 0.4;
        } else {
          ctx.strokeStyle = target.color || source.color;
          ctx.lineWidth = 1 * dpr;
          ctx.globalAlpha = activeHover ? 0.08 : isDark ? 0.35 : 0.45;
        }

        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      nodesRef.current.forEach((node) => {
        if (node.x === undefined || node.y === undefined) return;

        const isHovered = activeHover?.id === node.id;
        const isConnected = connectedNodeIds.has(node.id);
        const opacity = activeHover ? (isHovered || isConnected ? 1 : 0.15) : 0.95;

        ctx.globalAlpha = opacity;

        if (node.type === "hub") {
          const hubRadius = isHovered ? 12 * dpr : 8 * dpr;

          ctx.shadowColor = node.color;
          ctx.shadowBlur = isHovered ? (isDark ? 24 : 14) * dpr : (isDark ? 14 : 8) * dpr;

          ctx.beginPath();
          ctx.arc(node.x, node.y, hubRadius, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(node.x, node.y, hubRadius + (isHovered ? 5 * dpr : 3.5 * dpr), 0, Math.PI * 2);
          ctx.strokeStyle = node.color;
          ctx.lineWidth = 1.5 * dpr;
          ctx.stroke();

          ctx.shadowBlur = 0;
        } else {
          const dotRadius = isHovered ? 7 * dpr : 4.5 * dpr;

          ctx.shadowColor = node.color;
          ctx.shadowBlur = isHovered ? (isDark ? 18 : 10) * dpr : (isDark ? 8 : 4) * dpr;

          ctx.beginPath();
          ctx.arc(node.x, node.y, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.fill();

          if (isHovered) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, dotRadius + 4 * dpr, 0, Math.PI * 2);
            ctx.strokeStyle = node.color;
            ctx.lineWidth = 1.5 * dpr;
            ctx.stroke();
          }

          ctx.shadowBlur = 0;

          ctx.font = `${isHovered ? "600" : "500"} ${11.5 * dpr}px Inter, sans-serif`;
          ctx.fillStyle = isHovered
            ? isDark
              ? "#ffffff"
              : "#09090b"
            : isDark
              ? "rgba(240, 240, 245, 0.9)"
              : "rgba(24, 24, 27, 0.88)";
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          ctx.fillText(node.label, node.x + dotRadius + 7 * dpr, node.y);
        }

        ctx.globalAlpha = 1;
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [hoveredNode, isDark]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    const x = clientX * dpr;
    const y = clientY * dpr;

    let foundNode: GraphNode | null = null;

    for (const node of nodesRef.current) {
      if (node.x === undefined || node.y === undefined) continue;
      const hitRadius = (node.type === "hub" ? 22 : 18) * dpr;
      const dx = node.x - x;
      const dy = node.y - y;
      if (Math.hypot(dx, dy) <= hitRadius) {
        foundNode = node;
        break;
      }
    }

    setHoveredNode(foundNode);
    if (foundNode) {
      setTooltipPos({ x: e.clientX, y: e.clientY });
    }
  };

  return (
    <MaxWidthWrapper
      className="flex min-h-screen w-full flex-col items-center justify-center gap-6 py-12"
      id="impact"
    >
      <div className="flex w-full flex-col items-start justify-center gap-4">
        <SectionBadge label="impact & metrics" />
        <h2 className="font-bold font-heading text-6xl md:text-7xl">Proof, not promises.</h2>
      </div>

      <div className="relative w-full select-none overflow-visible" ref={containerRef}>
        <canvas
          className="block w-full cursor-default"
          onMouseLeave={() => setHoveredNode(null)}
          onMouseMove={handleMouseMove}
          ref={canvasRef}
        />

        {hoveredNode && (
          <div
            className="pointer-events-none fixed z-50 flex max-w-sm flex-col gap-2 rounded-2xl border border-border bg-card/95 p-4 text-card-foreground shadow-2xl backdrop-blur-xl transition-all duration-150"
            style={{
              left: `${
                tooltipPos.x + 360 > (typeof window !== "undefined" ? window.innerWidth : 1200)
                  ? tooltipPos.x - 360
                  : tooltipPos.x + 16
              }px`,
              top: `${
                tooltipPos.y + 200 > (typeof window !== "undefined" ? window.innerHeight : 800)
                  ? tooltipPos.y - 180
                  : tooltipPos.y + 16
              }px`,
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className="rounded-full px-2.5 py-0.5 font-semibold text-[11px] uppercase tracking-wider"
                style={{
                  backgroundColor: `${hoveredNode.color}20`,
                  color: hoveredNode.color,
                  border: `1px solid ${hoveredNode.color}40`,
                }}
              >
                {hoveredNode.category}
              </span>
              {hoveredNode.company && (
                <span className="font-mono text-[11px] text-muted-foreground">
                  {hoveredNode.company}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1 pt-1">
              <h4 className="font-bold text-base text-foreground">
                {hoveredNode.title || hoveredNode.label}
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {hoveredNode.detail ||
                  `Interactive category hub for ${hoveredNode.category} metrics and achievements.`}
              </p>
            </div>
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default Impact;

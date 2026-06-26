export type N8nNodeCategory = "trigger" | "transform" | "integration" | "logic";

export type ReactFlowGraphNode = {
  id: string;
  type: "n8n";
  position: { x: number; y: number };
  data: {
    label: string;
    nodeType: string;
    category: N8nNodeCategory;
  };
};

export type ReactFlowGraphEdge = {
  id: string;
  source: string;
  target: string;
};

export type ReactFlowGraph = {
  nodes: ReactFlowGraphNode[];
  edges: ReactFlowGraphEdge[];
};

type N8nWorkflowJson = {
  nodes?: unknown[];
  connections?: Record<string, unknown>;
};

type N8nNodeRecord = Record<string, unknown>;

const TRIGGER_TYPES = new Set([
  "webhook",
  "cron",
  "scheduletrigger",
  "manualtrigger",
  "formtrigger",
  "chattrigger",
  "calendlytrigger",
  "typeformtrigger",
  "emailreadimap",
  "emailsend",
  "mqtttrigger",
  "ssetrigger",
]);

const TRANSFORM_TYPES = new Set([
  "set",
  "merge",
  "code",
  "function",
  "functionitem",
  "splitinbatches",
  "itemlists",
  "aggregate",
  "summarize",
  "renamekeys",
  "removeduplicates",
  "sort",
  "limit",
  "datetime",
  "crypto",
  "html",
  "xml",
  "markdown",
]);

const LOGIC_TYPES = new Set([
  "if",
  "switch",
  "wait",
  "filter",
  "noop",
  "stopanderror",
  "comparedatasets",
  "executeworkflow",
  "executeworkflowtrigger",
]);

export function formatNodeTypeShort(type: unknown): string {
  if (typeof type !== "string") return "Unknown";
  const suffix = type.split(".").pop() ?? type;
  return suffix
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
}

export function categorizeNodeType(type: unknown): N8nNodeCategory {
  if (typeof type !== "string") return "integration";

  const normalized = type.toLowerCase();
  const shortType = (type.split(".").pop() ?? type).toLowerCase();

  if (normalized.includes("trigger") || TRIGGER_TYPES.has(shortType))
    return "trigger";
  if (TRANSFORM_TYPES.has(shortType)) return "transform";
  if (LOGIC_TYPES.has(shortType)) return "logic";

  return "integration";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parsePosition(value: unknown): { x: number; y: number } {
  if (Array.isArray(value) && value.length >= 2) {
    const x = Number(value[0]);
    const y = Number(value[1]);
    if (Number.isFinite(x) && Number.isFinite(y)) {
      return { x, y };
    }
  }

  return { x: 0, y: 0 };
}

function buildNameToIdMap(nodes: N8nNodeRecord[]): Map<string, string> {
  const map = new Map<string, string>();

  for (const node of nodes) {
    const id = node.id;
    const name = node.name;
    if (typeof id === "string" && typeof name === "string") {
      map.set(name, id);
    }
  }

  return map;
}

function extractEdges(
  connections: Record<string, unknown>,
  nameToId: Map<string, string>,
): ReactFlowGraphEdge[] {
  const edges: ReactFlowGraphEdge[] = [];

  for (const [sourceName, outputs] of Object.entries(connections)) {
    const sourceId = nameToId.get(sourceName);
    if (!sourceId || !isRecord(outputs)) continue;

    for (const outputConnections of Object.values(outputs)) {
      if (!Array.isArray(outputConnections)) continue;

      for (const branch of outputConnections) {
        if (!Array.isArray(branch)) continue;

        for (const connection of branch) {
          if (!isRecord(connection)) continue;

          const targetName = connection.node;
          if (typeof targetName !== "string") continue;

          const targetId = nameToId.get(targetName);
          if (!targetId) continue;

          edges.push({
            id: `${sourceId}-${targetId}-${edges.length}`,
            source: sourceId,
            target: targetId,
          });
        }
      }
    }
  }

  return edges;
}

export function n8nToReactFlow(workflow: unknown): ReactFlowGraph {
  if (!isRecord(workflow)) {
    return { nodes: [], edges: [] };
  }

  const { nodes: rawNodes, connections: rawConnections } =
    workflow as N8nWorkflowJson;

  if (!Array.isArray(rawNodes) || !isRecord(rawConnections)) {
    return { nodes: [], edges: [] };
  }

  const nodes = rawNodes.filter(isRecord);
  const nameToId = buildNameToIdMap(nodes);

  const reactFlowNodes: ReactFlowGraphNode[] = nodes.flatMap((node) => {
    const id = node.id;
    if (typeof id !== "string") return [];

    const label = typeof node.name === "string" ? node.name : "Unnamed";
    const nodeType = formatNodeTypeShort(node.type);

    return [
      {
        id,
        type: "n8n" as const,
        position: parsePosition(node.position),
        data: {
          label,
          nodeType,
          category: categorizeNodeType(node.type),
        },
      },
    ];
  });

  const edges = extractEdges(rawConnections, nameToId);

  return { nodes: reactFlowNodes, edges };
}

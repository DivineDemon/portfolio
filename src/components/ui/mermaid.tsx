import mermaid from "mermaid";
import { useEffect, useId, useRef, useState } from "react";

interface MermaidProps {
  chart: string;
}

export const Mermaid = ({ chart }: MermaidProps) => {
  const id = useId().replace(/:/g, "m");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const renderChart = async () => {
      try {
        const isDark = document.documentElement.classList.contains("dark");
        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          securityLevel: "loose",
          fontFamily: "Inter Variable, Inter, sans-serif",
          flowchart: {
            htmlLabels: true,
            curve: "basis",
            padding: 16,
            nodeSpacing: 40,
            rankSpacing: 45,
          },
          themeVariables: isDark
            ? {
                darkMode: true,
                background: "transparent",
                primaryColor: "#2b2526",
                primaryTextColor: "#f5f5f5",
                primaryBorderColor: "#e11d48",
                lineColor: "#a1a1aa",
                textColor: "#f5f5f5",
                mainBkg: "#1c1917",
                secondBkg: "#262626",
                nodeBorder: "#e11d48",
                clusterBkg: "rgba(38, 38, 38, 0.4)",
                clusterBorder: "#52525b",
                edgeLabelBackground: "#262626",
                tertiaryColor: "#1c1917",
                fontFamily: "Inter Variable, Inter, sans-serif",
                fontSize: "12px",
              }
            : {
                darkMode: false,
                background: "transparent",
                primaryColor: "#fcfbf9",
                primaryTextColor: "#1c1917",
                primaryBorderColor: "#e11d48",
                lineColor: "#71717a",
                textColor: "#1c1917",
                mainBkg: "#ffffff",
                secondBkg: "#f5f5f4",
                nodeBorder: "#e11d48",
                clusterBkg: "rgba(245, 245, 244, 0.4)",
                clusterBorder: "#e7e5e4",
                edgeLabelBackground: "#ffffff",
                tertiaryColor: "#f5f5f4",
                fontFamily: "Inter Variable, Inter, sans-serif",
                fontSize: "12px",
              },
        });

        const cleanChart = chart.trim();
        const { svg: renderedSvg } = await mermaid.render(`mermaid-${id}`, cleanChart);
        if (isMounted) {
          setSvg(renderedSvg);
          setError(null);
        }
      } catch (err) {
        console.error("Mermaid render error:", err);
        if (isMounted) {
          setError("Failed to render diagram.");
        }
      }
    };

    renderChart();

    const observer = new MutationObserver(() => {
      renderChart();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      isMounted = false;
      observer.disconnect();
    };
  }, [chart, id]);

  if (error) {
    return (
      <div className="my-4 w-full overflow-x-auto rounded-xl border border-destructive/30 bg-destructive/10 p-4 font-mono text-destructive text-xs">
        <pre>{chart}</pre>
      </div>
    );
  }

  return (
    <div
      className="mermaid my-6 flex w-full items-center justify-center overflow-x-auto py-2"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: legacy-mermaid
      dangerouslySetInnerHTML={{ __html: svg }}
      ref={containerRef}
    />
  );
};

export default Mermaid;

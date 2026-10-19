import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Mermaid from "./mermaid";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      components={{
        pre({ children }) {
          return <>{children}</>;
        },
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");

          if (match?.[1] === "mermaid") {
            return <Mermaid chart={String(children).replace(/\n$/, "")} />;
          }

          if (match) {
            return (
              <pre>
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            );
          }

          return (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
      remarkPlugins={[remarkGfm]}
    >
      {content ?? ""}
    </ReactMarkdown>
  );
}

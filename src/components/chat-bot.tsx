"use client";

import MDEditor from "@uiw/react-md-editor";
import { BotMessageSquare, CircleX, Loader2, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { ragAction } from "@/app/(server-actions)/rag-action";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const ChatBot = () => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello! I am Mushood's AI assistant. You can ask me anything about Mushood's portfolio, projects, or skills. How can I help you today?",
    },
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest(".chat-toggle-button")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleChat = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: query }, { role: "assistant", content: "" }]);
    const currentQuery = query;
    setQuery("");

    try {
      const response: ReadableStream | null = await ragAction(currentQuery, messages);

      if (!response) {
        toast.error("No response body received");
        setMessages((prev) => prev.slice(0, -1));
        return;
      }

      const reader = response.getReader();
      const decoder = new TextDecoder();
      let botMessage = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((line) => line.trim());

        for (const line of lines) {
          try {
            const data = JSON.parse(line);
            let content = "";

            if (data.content) {
              content = data.content;
            } else if (data.message) {
              content = data.message;
            } else if (data.response) {
              content = data.response;
            } else if (typeof data === "string") {
              content = data;
            }

            if (content) {
              botMessage += content;
              setMessages((prev) =>
                prev.map((msg, index) => (index === prev.length - 1 ? { ...msg, content: botMessage } : msg)),
              );
            }
          } catch {
            if (line.trim()) {
              botMessage += line;
              setMessages((prev) =>
                prev.map((msg, index) => (index === prev.length - 1 ? { ...msg, content: botMessage } : msg)),
              );
            }
          }
        }
      }
    } catch (_error) {
      toast.error("Chat Failed!");
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "assistant",
          content: "Error processing request. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed right-10 bottom-10 z-[1]">
      <button
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close chat bot" : "Open chat bot"}
        className="chat-toggle-button flex size-14 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/10 p-4 backdrop-blur"
      >
        <BotMessageSquare
          className={cn("size-full text-white transition-all duration-500 ease-in-out", { "rotate-[360deg]": isOpen })}
        />
      </button>

      <div
        ref={popupRef}
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.stopPropagation();
          }
        }}
        className={cn(
          "absolute right-0 bottom-24 flex aspect-[9/16] w-72 flex-col items-start justify-between rounded-lg border border-white/15 bg-white/10 backdrop-blur transition-opacity duration-500 ease-in-out",
          {
            "pointer-events-auto opacity-100": isOpen,
            "pointer-events-none opacity-0": !isOpen,
          },
        )}
      >
        <div className="flex w-full items-center justify-center rounded-t-lg border-white/15 border-b py-2.5 pr-2.5 pl-5 text-white">
          <span className="flex-1 text-left font-semibold">Chat Bot</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            <CircleX />
          </Button>
        </div>
        <div className="flex h-[calc(100%-113px)] w-full flex-col items-start justify-start gap-2.5 overflow-y-auto p-2.5">
          {messages.map((message, idx) => {
            const isLast = idx === messages.length - 1;
            const isAssistant = message.role === "assistant";

            return (
              <div
                key={idx}
                className={cn("rounded-md bg-secondary px-3 py-1.5 text-xs", {
                  "flex flex-col items-center justify-center": isAssistant && isLast && loading,
                  "ml-auto w-3/4 bg-primary text-right text-white": !isAssistant,
                  "bg-secondary text-black": isAssistant,
                })}
              >
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <MDEditor.Markdown
                    source={message.content}
                    style={{
                      fontSize: "12px",
                      backgroundColor: "transparent",
                      color: isAssistant ? "inherit" : "white",
                    }}
                  />
                </div>
                {isAssistant && isLast && loading && <Loader2 className="size-4 animate-spin" />}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleChat();
          }}
          className="flex w-full items-center justify-center gap-2.5 border-white/15 border-t p-2.5"
          onClick={(e) => e.stopPropagation()}
        >
          <Input
            type="text"
            value={query}
            placeholder="Ask a question..."
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border-white/15 text-xs placeholder:text-xs"
            disabled={loading}
          />
          <Button
            disabled={loading || !query.trim()}
            type="submit"
            variant="default"
            size="icon"
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.stopPropagation();
              }
            }}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;

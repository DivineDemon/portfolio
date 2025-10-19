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
  id?: number;
  isLoading?: boolean;
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
        "Hey there! 👋 I'm Mushood's AI sidekick, and I'm super excited to chat with you! Ask me anything about his portfolio, projects, skills, or work experience - I'm here to help! 🚀",
      id: 1,
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
    const currentQuery = query;
    setQuery("");

    const updatedMessages = [
      ...messages,
      {
        role: "user" as const,
        content: currentQuery,
        id: Date.now() + 1,
      },
    ];
    setMessages(updatedMessages);

    const loadingMessageId = Date.now();
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "",
        id: loadingMessageId,
        isLoading: true,
      },
    ]);

    try {
      const response: ReadableStream | null = await ragAction(updatedMessages);

      if (!response) {
        toast.error("No response body received");
        setMessages((prev) => prev.filter((msg) => msg.id !== loadingMessageId));
        return;
      }

      const reader = response.getReader();
      const decoder = new TextDecoder();
      let streamingContent = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        try {
          const parsed = JSON.parse(chunk);
          const data = parsed[0];

          if (data.type === "chunk") {
            streamingContent += data.content;
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === loadingMessageId ? { ...msg, content: streamingContent, isLoading: false } : msg,
              ),
            );
          } else if (data.type === "complete") {
            setLoading(false);
            break;
          }
        } catch {
          const responsePattern = /\[{"output":"(.+?)"}\]/;
          const match = chunk.match(responsePattern);

          if (match && match[1]) {
            const botMessage = match[1].replace(/\\"/g, '"').replace(/\\n/g, "\n");
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === loadingMessageId ? { ...msg, content: botMessage, isLoading: false } : msg,
              ),
            );
            setLoading(false);
            break;
          }
        }
      }
    } catch {
      toast.error("Chat Failed!");
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessageId
            ? {
                ...msg,
                content: "Error processing request. Please try again.",
                isLoading: false,
              }
            : msg,
        ),
      );
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
            const isAssistant = message.role === "assistant";
            const isMessageLoading = message.isLoading;

            return (
              <div
                key={message.id || idx}
                className={cn("rounded-md bg-secondary px-3 py-1.5 text-xs", {
                  "flex flex-col items-center justify-center": isAssistant && isMessageLoading,
                  "ml-auto w-fit max-w-3/4 bg-primary text-right text-white": !isAssistant,
                  "bg-secondary text-black": isAssistant,
                })}
              >
                {isMessageLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                    </div>
                    <span className="text-gray-500 text-xs">AI is thinking...</span>
                  </div>
                ) : (
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
                )}
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

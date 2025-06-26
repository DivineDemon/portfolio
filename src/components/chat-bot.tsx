"use client";

import { useEffect, useRef, useState } from "react";

import { BotMessageSquare, CircleX, Loader2, Send } from "lucide-react";
import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

import { ragAction } from "@/app/(server-actions)/rag-action";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

const ChatBot = () => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([
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
    setMessages((prev) => [
      ...prev,
      { role: "user", content: query },
      { role: "assistant", content: "" },
    ]);
    setQuery("");

    try {
      const response: ReadableStream = await ragAction(query, messages);

      if (!response) {
        toast.error("No response body received");
        return;
      }

      const reader = response.getReader();
      const decoder = new TextDecoder();
      let botMessage = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        const jsonObjects = chunk
          .split("\n")
          .filter((line) => line.trim())
          .map((line) => {
            try {
              return JSON.parse(line);
            } catch (e) {
              console.error("JSON Parse Error:", e);
              return null;
            }
          })
          .filter((json) => json !== null);

        for (const jsonObj of jsonObjects) {
          let content = "";

          if (typeof jsonObj === "string") {
            content = jsonObj;
          } else if (jsonObj?.choices?.[0]?.delta?.content) {
            const deltaContent = jsonObj.choices[0].delta.content;

            if (typeof deltaContent === "string") {
              content = deltaContent;
            } else if (
              typeof deltaContent === "object" &&
              deltaContent?.response
            ) {
              content = deltaContent.response;
            }
          } else if (jsonObj?.response) {
            content = jsonObj.response;
          }

          if (content) {
            botMessage += content;
            setMessages((prev) =>
              prev.map((msg, index) =>
                index === prev.length - 1
                  ? { ...msg, content: botMessage }
                  : msg
              )
            );
          }
        }
      }
    } catch (error) {
      toast.error("Chat Failed!");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error processing request.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-[1]">
      <button
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close chat bot" : "Open chat bot"}
        className="chat-toggle-button flex size-14 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/10 p-4 backdrop-blur"
      >
        <BotMessageSquare
          className={cn(
            "size-full text-white transition-all duration-500 ease-in-out",
            { "rotate-[360deg]": isOpen }
          )}
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
          "absolute bottom-24 right-0 flex aspect-[9/16] w-72 flex-col items-start justify-between rounded-lg border border-white/15 bg-white/10 backdrop-blur transition-opacity duration-500 ease-in-out",
          {
            "pointer-events-auto opacity-100": isOpen,
            "pointer-events-none opacity-0": !isOpen,
          }
        )}
      >
        <div className="flex w-full items-center justify-center rounded-t-lg border-b border-white/15 py-2.5 pl-5 pr-2.5 text-white">
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
              <span
                key={idx}
                className={cn("rounded-md bg-secondary px-3 py-1.5 text-xs", {
                  "flex items-center": isAssistant && isLast && loading,
                  "ml-auto w-2/3 bg-primary text-white": !isAssistant,
                  "bg-secondary text-black": isAssistant,
                })}
              >
                <ReactMarkdown>{message.content as string}</ReactMarkdown>
                {isAssistant && isLast && loading && (
                  <Loader2 className="size-4 animate-spin" />
                )}
              </span>
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
          className="flex w-full items-center justify-center gap-2.5 border-t border-white/15 p-2.5"
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
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;

"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChat } from "ai/react";
import { useRef, useEffect } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCredits } from "@/lib/credits/credit-manager";
import { AIFeature } from "@prisma/client";

interface ChatProps {
  userId: string;
  accountId: string;
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Card className="p-4 bg-destructive/10 text-destructive">
      <h2 className="text-lg font-semibold">Error:</h2>
      <p>{error.message}</p>
      <Button onClick={resetErrorBoundary} variant="outline" className="mt-2">
        Try again
      </Button>
    </Card>
  );
}

export function Chat({ userId, accountId }: ChatProps) {
  const { messages, input, handleInputChange, isLoading, setInput } = useChat({
    api: "/api/chat",
    body: { userId, accountId },
    onError: (error: Error) => {
      toast.error("Failed to send message: " + error.message);
      console.error("Chat error:", error);
    },
  });

  const chatParent = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const domNode = chatParent.current;
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight;
    }
  }, [messages]);

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      // Deduct credits before sending message
      await useCredits(userId, AIFeature.TRADING_INSIGHTS);

      // Clear input first to prevent double submission
      const messageContent = input;
      setInput("");

      // Send the message
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, { content: messageContent, role: "user" }],
          userId,
          accountId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to process message");
      }
      console.error("Chat error:", error);
    }
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Card className="flex flex-col w-full h-[calc(100vh-14rem)] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <header className="p-4 border-b">
          <h1 className="text-xl font-semibold">Trading Assistant</h1>
          <p className="text-sm text-muted-foreground">Ask questions about your trading patterns and get AI-powered insights (3 credits per message)</p>
        </header>

        <section className="flex-grow overflow-hidden relative">
          <ul ref={chatParent} className="h-full p-4 overflow-y-auto space-y-4">
            {messages.map((m) => (
              <li key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-lg p-4 ${m.role === "user" ? "bg-primary text-primary-foreground ml-4" : "bg-muted"}`}>
                  <p className="whitespace-pre-wrap">{m.content}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <footer className="p-4 border-t">
          <form onSubmit={handleMessageSubmit} className="flex gap-2">
            <Input className="flex-1" placeholder="Ask about your trading patterns..." value={input} onChange={handleInputChange} disabled={isLoading} />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send"}
            </Button>
          </form>
        </footer>
      </Card>
    </ErrorBoundary>
  );
}

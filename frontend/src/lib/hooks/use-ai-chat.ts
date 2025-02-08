import { useChat } from "ai/react";
import { type Message } from "ai";
import { type UseAIChatOptions } from "@/lib/types/ai";

export function useAIChat({ initialMessages = [], functions, onResponse, onError }: UseAIChatOptions = {}) {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error, append, reload, stop, setMessages } = useChat({
    api: "/api/ai/completion",
    initialMessages,
    body: functions ? { functions } : undefined,
    onResponse,
    onError: (error) => {
      console.error("AI Chat Error:", error);
      onError?.(error);
    },
  });

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    append,
    reload,
    stop,
    setMessages,
  };
}

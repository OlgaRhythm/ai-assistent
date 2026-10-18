import { useEffect, useRef } from "react";
import type { ChatMessage } from "../types/chat";
import { ChatMessageItem } from "./ChatMessageItem";

interface ChatWindowProps {
  messages: ChatMessage[];
  userId: number;
  selectedOrderId: number | undefined;
  onOrderChange: (orderId: number | undefined) => void;
  onOrderApply: (orderId: number) => void;
  disabled: boolean;
}

export function ChatWindow({
  messages,
  userId,
  selectedOrderId,
  onOrderChange,
  onOrderApply,
  disabled,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="chat-window">
      <ul className="chat-window__list">
        {messages.map((message) => (
          <ChatMessageItem
            key={message.id}
            message={message}
            userId={userId}
            selectedOrderId={selectedOrderId}
            onOrderChange={onOrderChange}
            onOrderApply={onOrderApply}
            disabled={disabled}
          />
        ))}
      </ul>
      <div ref={bottomRef} />
    </div>
  );
}

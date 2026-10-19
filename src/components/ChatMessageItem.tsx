import type { ChatMessage } from "../types/chat";
import { OrderSelect } from "./OrderSelect";
import { TechnicalDetails } from "./TechnicalDetails";

interface ChatMessageItemProps {
  message: ChatMessage;
  userId: number;
  selectedOrderId: number | undefined;
  onOrderChange: (orderId: number | undefined) => void;
  onOrderApply: (orderId: number) => void;
  disabled: boolean;
}

export function ChatMessageItem({
  message,
  userId,
  selectedOrderId,
  onOrderChange,
  onOrderApply,
  disabled,
}: ChatMessageItemProps) {
  if (message.role === "system") {
    return (
      <li className={`message message--system message--${message.variant}`}>
        <span className="bubble bubble--system">{message.text}</span>
      </li>
    );
  }

  return (
    <li className={`message message--${message.role}`}>
      <span className={`bubble bubble--${message.role}`}>{message.text}</span>
      {message.role === "assistant" && message.technical && (
        <TechnicalDetails technical={message.technical} traceId={message.traceId} />
      )}
      {message.role === "assistant" && message.needsOrderId && (
        <OrderSelect
          userId={userId}
          selectedOrderId={selectedOrderId}
          onChange={onOrderChange}
          onApply={onOrderApply}
          disabled={disabled}
        />
      )}
    </li>
  );
}

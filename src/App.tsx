import { useState } from "react";
import { ApiError, generateTraceId, sendSupportMessage } from "./api/client";
import { ResponseType } from "./api/types";
import { ChatWindow } from "./components/ChatWindow";
import { MessageInput } from "./components/MessageInput";
import { SettingsMenu } from "./components/SettingsMenu";
import type { ChatMessage } from "./types/chat";
import "./App.css";

function randomId(): number {
  return Math.floor(Math.random() * 1_000_000_000);
}

function readOrCreateId(storageKey: string): number {
  const stored = localStorage.getItem(storageKey);
  if (stored) return Number(stored);
  const created = randomId();
  localStorage.setItem(storageKey, String(created));
  return created;
}

function createMessageId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function App() {
  const [userId, setUserId] = useState(() => readOrCreateId("ai-assistent-userId"));
  const [sessionId, setSessionId] = useState(() => readOrCreateId("ai-assistent-sessionId"));
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | undefined>(undefined);

  function addMessage(message: ChatMessage) {
    setMessages((prev) => [...prev, message]);
  }

  async function handleSend(text: string, orderIdOverride?: number) {
    const orderId = orderIdOverride ?? selectedOrderId;
    const traceId = generateTraceId();
    addMessage({ id: createMessageId(), role: "user", text });
    setIsSending(true);

    try {
      const response = await sendSupportMessage(
        { userId, sessionId, message: text, orderId },
        traceId,
      );

      addMessage({
        id: createMessageId(),
        role: "assistant",
        text: response.text,
        technical: response.technical,
        needsOrderId: response.type === ResponseType.ORDERINFOREQUEST,
        traceId,
      });
    } catch (error) {
      const text =
        error instanceof ApiError
          ? error.message
          : "Unexpected error while sending the message.";
      addMessage({ id: createMessageId(), role: "system", text, variant: "error" });
    } finally {
      setIsSending(false);
    }
  }

  function handleApplyOrder(orderId: number) {
    setSelectedOrderId(orderId);
    handleSend(`Order #${orderId} selected.`, orderId);
  }

  function handleNewConversation() {
    const newSessionId = randomId();
    localStorage.setItem("ai-assistent-sessionId", String(newSessionId));
    setSessionId(newSessionId);
    setMessages([]);
  }

  function handleApplySettings(newUserId: number, newSessionId: number) {
    localStorage.setItem("ai-assistent-userId", String(newUserId));
    localStorage.setItem("ai-assistent-sessionId", String(newSessionId));
    setUserId(newUserId);
    setSessionId(newSessionId);
    setMessages([]);
    setSelectedOrderId(undefined);
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>AI Support Assistant</h1>
        <SettingsMenu
          userId={userId}
          sessionId={sessionId}
          onApply={handleApplySettings}
          onNewConversation={handleNewConversation}
        />
      </header>

      <ChatWindow
        messages={messages}
        userId={userId}
        selectedOrderId={selectedOrderId}
        onOrderChange={setSelectedOrderId}
        onOrderApply={handleApplyOrder}
        disabled={isSending}
        isWaitingForReply={isSending}
      />

      <MessageInput onSend={handleSend} disabled={isSending} />
    </div>
  );
}

export default App;

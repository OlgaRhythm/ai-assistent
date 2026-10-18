import { useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";

interface MessageInputProps {
  onSend: (text: string) => void;
  disabled: boolean;
}

export function MessageInput({ onSend, disabled }: MessageInputProps) {
  const [text, setText] = useState("");

  const canSend = !disabled && text.trim().length >= 3;

  function submit() {
    if (!canSend) return;
    onSend(text.trim());
    setText("");
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    submit();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  }

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <textarea
        className="message-input__text"
        placeholder="Type a message..."
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        rows={1}
        minLength={3}
        maxLength={300}
      />
      <button type="submit" className="message-input__send" disabled={!canSend}>
        Send
      </button>
    </form>
  );
}

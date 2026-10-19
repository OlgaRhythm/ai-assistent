export function TypingIndicator() {
  return (
    <li className="message message--assistant">
      <span className="bubble bubble--assistant typing-indicator" aria-label="Assistant is typing">
        <span className="typing-indicator__dot" />
        <span className="typing-indicator__dot" />
        <span className="typing-indicator__dot" />
      </span>
    </li>
  );
}

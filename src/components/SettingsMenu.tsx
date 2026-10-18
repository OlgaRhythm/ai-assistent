import { useState } from "react";
import type { FormEvent } from "react";

interface SettingsMenuProps {
  userId: number;
  sessionId: number;
  onApply: (userId: number, sessionId: number) => void;
  onNewConversation: () => void;
}

export function SettingsMenu({
  userId,
  sessionId,
  onApply,
  onNewConversation,
}: SettingsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [userIdInput, setUserIdInput] = useState(String(userId));
  const [sessionIdInput, setSessionIdInput] = useState(String(sessionId));

  function openPanel() {
    setUserIdInput(String(userId));
    setSessionIdInput(String(sessionId));
    setIsOpen(true);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const newUserId = Number(userIdInput);
    const newSessionId = Number(sessionIdInput);
    if (!Number.isInteger(newUserId) || newUserId < 1) return;
    if (!Number.isInteger(newSessionId) || newSessionId < 1) return;
    onApply(newUserId, newSessionId);
    setIsOpen(false);
  }

  function handleNewConversation() {
    onNewConversation();
    setIsOpen(false);
  }

  return (
    <div className="settings-menu">
      <button
        type="button"
        className="settings-menu__toggle"
        aria-label="Settings"
        onClick={() => (isOpen ? setIsOpen(false) : openPanel())}
      >
        ⚙
      </button>

      {isOpen && (
        <div className="settings-menu__panel">
          <button
            type="button"
            className="settings-menu__new-chat"
            onClick={handleNewConversation}
          >
            New conversation
          </button>

          <form className="settings-menu__form" onSubmit={handleSubmit}>
            <label className="settings-menu__field">
              User ID
              <input
                type="number"
                min={1}
                value={userIdInput}
                onChange={(event) => setUserIdInput(event.target.value)}
              />
            </label>
            <label className="settings-menu__field">
              Session ID
              <input
                type="number"
                min={1}
                value={sessionIdInput}
                onChange={(event) => setSessionIdInput(event.target.value)}
              />
            </label>
            <button type="submit" className="settings-menu__apply">
              Apply
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

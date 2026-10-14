"use client";

import { useState } from "react";
import { useCompose } from "../states/compose";
import { getChatResponse, getMessages } from "../actions";
import { useSnackBar } from "../states/snackbar";

type EmailMessage = {
  id?: string;
  role: string;
  query: string;
};

type EmailData = {
  id: string;
  userId: string;
  messages: EmailMessage[];
};

export default function ComposeEmail() {
  const compose = useCompose();
  const snackbar = useSnackBar();

  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sendTo, setSendTo] = useState("");
  const [messageLoading, setMessageLoading] = useState(false);
  const [emailData, setEmailData] = useState<EmailData | null>(null);

  const [minimized, setMinimized] = useState(false);
  const [agentHidden, setAgentHidden] = useState(false);

  const emailId = compose.id;

  const accept = () => {};

  const sendMessage = async () => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery || messageLoading) return;

    setMessageLoading(true);
    setQuery("");

    try {
      const check = await getChatResponse(trimmedQuery, emailId);

      if (check.error !== null) {
        snackbar.showSnackBar(check.error, "error");
        return;
      }

      const data = await getMessages(emailId);

      if (data.error !== null) {
        setEmailData(null);
        snackbar.showSnackBar(data.error, "error");
        return;
      }

      setEmailData(data.data);
    } catch {
      snackbar.showSnackBar(
        "Unable to get a response. Please try again.",
        "error",
      );
    } finally {
      setMessageLoading(false);
    }
  };

  const acceptSuggestion = (message: EmailMessage) => {
    try {
      const response =
        message.role === "model" ? JSON.parse(message.query) : null;

      if (!response || response.result == null || response.result === "null") {
        return;
      }

      // Expected agent output: Subject: ... followed by the email body.
      const result = String(response.result).trim();
      const subjectMatch = result.match(
        /^(?:Subject:\s*)([^\n]+)\n?([\s\S]*)$/i,
      );

      if (subjectMatch) {
        setSubject(subjectMatch[1].trim());
        setBody(subjectMatch[2].trim());
      } else {
        // If no subject is provided, insert the result into the body.
        setBody(result);
      }

      snackbar.showSnackBar("Suggestion accepted", "success");
    } catch {
      snackbar.showSnackBar("Could not read this suggestion.", "error");
    }
  };

  const discardDraft = () => {
    setSendTo("");
    setSubject("");
    setBody("");
    compose.hideSnackBar();
  };

  if (!compose.snackbar.show) return null;

  return (
    <div
      className="fixed inset-0 z-[3] flex items-center justify-center
      bg-black/50 backdrop-blur-sm p-2 sm:p-4"
    >
      {/* Main compose window */}
      <div
        className={`flex flex-col w-full sm:w-[90%] xl:w-[85%]
          max-w-[1400px] min-w-0 min-h-0 shrink-0
          rounded-md bg-[var(--bg-secondary)] shadow-xl
          overflow-hidden ${
            minimized ? "h-auto max-h-[90vh]" : "h-[85dvh] max-h-[900px]"
          }`}
      >
        {/* Header */}
        <div
          className="flex w-full shrink-0 items-center
          justify-between gap-3 border-b border-[var(--border)]
          px-4 py-3"
        >
          <span className="text-lg font-bold">Compose</span>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setAgentHidden((prev) => !prev)}
              className="text-sm text-[var(--text-secondary)]
                hover:text-[var(--text-primary)]"
            >
              {agentHidden ? "Show Agent" : "Hide Agent"}
            </button>

            <button
              type="button"
              onClick={() => setMinimized((prev) => !prev)}
              className="text-sm text-[var(--text-secondary)]
                hover:text-[var(--text-primary)]"
            >
              {minimized ? "Restore" : "Minimize"}
            </button>

            <button
              type="button"
              onClick={compose.hideSnackBar}
              aria-label="Close compose"
              className="text-xl leading-none text-[var(--text-secondary)]
                hover:text-[var(--text-primary)]"
            >
              ×
            </button>
          </div>
        </div>

        {/* Main content */}
        {!minimized && (
          <div className="flex flex-1 min-h-0 min-w-0 flex-col md:flex-row">
            {/* Left: Email editor */}
            <div
              className={`flex min-h-0 min-w-0 flex-col
                overflow-hidden ${
                  agentHidden ? "w-full" : "w-full md:flex-[0.7]"
                }`}
            >
              {/* Recipient */}
              <div
                className="flex w-full shrink-0 items-center
                gap-3 border-b border-[var(--border)] p-3"
              >
                <label
                  htmlFor="email-to"
                  className="shrink-0 font-bold text-sm"
                >
                  To:
                </label>

                <input
                  id="email-to"
                  type="email"
                  placeholder="Add recipient email"
                  value={sendTo}
                  onChange={(e) => setSendTo(e.target.value)}
                  className="w-full min-w-0 bg-transparent p-1
                    outline-none"
                />
              </div>

              {/* Subject */}
              <div
                className="flex w-full shrink-0 items-center
                gap-3 border-b border-[var(--border)] p-3"
              >
                <label
                  htmlFor="email-subject"
                  className="shrink-0 font-bold text-sm"
                >
                  Subject:
                </label>

                <input
                  id="email-subject"
                  type="text"
                  placeholder="What is this about?"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full min-w-0 bg-transparent p-1
                    outline-none"
                />
              </div>

              {/* Email body */}
              <div
                className="flex flex-1 min-h-0 min-w-0
                overflow-hidden p-3"
              >
                <textarea
                  placeholder="Your Message"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="h-full min-h-0 w-full min-w-0
                    resize-none bg-transparent border-0
                    outline-none focus:outline-none"
                />
              </div>

              {/* Editor actions */}
              <div
                className="flex w-full shrink-0 items-center
                justify-end gap-2 border-t border-[var(--border)] p-3"
              >
                <button
                  type="button"
                  onClick={discardDraft}
                  className="rounded-md border border-[var(--border)]
                    px-4 py-2 transition-colors
                    hover:bg-[var(--bg-primary)]"
                >
                  Discard
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!sendTo.trim() || !sendTo.includes("@")) {
                      snackbar.showSnackBar(
                        "Please enter a valid recipient email.",
                        "error",
                      );
                      return;
                    }

                    if (!subject.trim() || !body.trim()) {
                      snackbar.showSnackBar(
                        "Please enter a subject and message.",
                        "error",
                      );
                      return;
                    }

                    // Connect your existing email-sending action here.
                    snackbar.showSnackBar(
                      "Connect your email-sending action to send this draft.",
                      "error",
                    );
                  }}
                  className="rounded-md bg-[var(--bg-primary)]
                    px-4 py-2 transition-colors
                    hover:opacity-80"
                >
                  Send
                </button>
              </div>
            </div>

            {/* Right: Writing Agent */}
            {!agentHidden && (
              <div
                className="flex w-full min-h-0 min-w-0
                flex-col overflow-hidden border-t border-[var(--border)]
                bg-[var(--bg-primary)] md:w-auto md:flex-[0.3]
                md:border-l md:border-t-0"
              >
                {/* Agent heading */}
                <div className="flex shrink-0 flex-col gap-1 p-3">
                  <span className="text-base font-bold">
                    Your Writing Agent
                  </span>

                  <span className="text-sm text-[var(--text-secondary)]">
                    How can I help you write?
                  </span>
                </div>

                {/* Scrollable messages */}
                <div
                  className="flex flex-1 min-h-0 min-w-0
                  flex-col gap-3 overflow-y-auto overflow-x-hidden
                  px-3 pb-3"
                >
                  {emailData?.messages.map((message, index) => {
                    let response: any = message.query;

                    if (message.role === "model") {
                      try {
                        response = JSON.parse(message.query);
                      } catch {
                        response = {
                          result: message.query,
                          feedback: "",
                        };
                      }
                    }

                    const isModel = message.role === "model";

                    const result = isModel ? response?.result : response;

                    const hasSuggestion =
                      isModel &&
                      result != null &&
                      result !== "null" &&
                      String(result).trim() !== "";

                    return (
                      <div
                        key={message.id ?? `${message.role}-${index}`}
                        className={`flex w-full min-w-0 shrink-0
                          flex-col gap-2 rounded-md p-2
                          [overflow-wrap:anywhere]
                          ${
                            isModel
                              ? "self-start bg-[var(--bg-secondary)]"
                              : "self-end bg-[var(--bg-card)]"
                          }`}
                      >
                        <span className="whitespace-pre-wrap text-sm">
                          {isModel
                            ? hasSuggestion
                              ? String(result) +
                                (response?.feedback
                                  ? `\n${response.feedback}`
                                  : "")
                              : "I CAN'T HELP YOU WITH THAT"
                            : String(response)}
                        </span>

                        {hasSuggestion && (
                          <div className="flex shrink-0">
                            <button
                              type="button"
                              onClick={() => acceptSuggestion(message)}
                              className="rounded-md border
                                border-[var(--border)] px-3 py-2
                                transition-colors
                                hover:bg-[var(--bg-primary)]"
                            >
                              Accept
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {messageLoading && (
                    <div
                      className="shrink-0 text-sm
                      text-[var(--text-secondary)]"
                    >
                      Writing...
                    </div>
                  )}
                </div>

                {/* Agent input fixed at bottom */}
                <div
                  className="flex w-full shrink-0 items-center
                  gap-2 border-t border-[var(--border)] p-3"
                >
                  <input
                    type="text"
                    placeholder="Ask your writing agent..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        void sendMessage();
                      }
                    }}
                    disabled={messageLoading}
                    className="min-w-0 flex-1 rounded-full
                      border border-[var(--border)]
                      bg-[var(--bg-secondary)] p-2 px-3
                      outline-none disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() => void sendMessage()}
                    disabled={messageLoading || !query.trim()}
                    className="shrink-0 rounded-md
                      bg-[var(--bg-secondary)] px-3 py-2
                      transition-colors hover:opacity-80
                      disabled:cursor-not-allowed
                      disabled:opacity-50"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

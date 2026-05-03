"use client";

// useRef added: scroll anchor + input refocus after send
// useCallback added: sendMessage was recreated on every render, now stable
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/app/components/section-heading";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

// Updated to reflect resume highlights — more specific and inviting
const STARTER_QUESTIONS = [
  "What's your biggest impact at Google One?",
  "How did you go from medicine to product management?",
  "What roles are you looking for next?",
  "Tell me about your AI and ML work.",
  "What's the story behind the $300M policy abuse reduction?",
] as const;

const MAX_INPUT_CHARS = 400;
// Show remaining count when the user is within 80 chars of the limit
const CHAR_WARN_THRESHOLD = MAX_INPUT_CHARS - 80;

export function DigitalTwinChatSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      // Warmer, more human-sounding opening
      content:
        "Hi! I'm Aparana's digital twin — ask me anything about her career, AI/ML work, or what she's looking for next. I'll answer as her.",
    },
  ]);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Scroll anchor at the bottom of the message list
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Input ref to restore focus after a message is sent
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to the latest message whenever messages or the loading state changes.
  // Previously there was no scroll management, so replies would appear off-screen.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // useCallback keeps the function reference stable so starter-question buttons
  // don't force unnecessary re-renders. Previously sendMessage was recreated every render.
  const sendMessage = useCallback(
    async (text: string) => {
      const prompt = text.trim();
      if (!prompt || isLoading) return;

      setError(null);
      const nextMessages: ChatMessage[] = [
        ...messages,
        { role: "user", content: prompt },
      ];
      setMessages(nextMessages);
      setDraft("");
      setIsLoading(true);

      try {
        const response = await fetch("/api/digital-twin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: nextMessages }),
        });

        const payload = (await response.json()) as {
          reply?: string;
          error?: string;
        };

        const reply = payload.reply;
        if (!response.ok || typeof reply !== "string" || !reply.trim()) {
          throw new Error(payload.error ?? "Unable to get a response right now.");
        }

        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Unable to get a response right now.";
        setError(message);
      } finally {
        setIsLoading(false);
        // Return focus to the input after send so the user can keep typing without
        // clicking. Previously focus was lost and the user had to click back in.
        inputRef.current?.focus();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading, messages],
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await sendMessage(draft);
  }

  // Previously used useMemo for canSend — unnecessary, a plain boolean is fine here
  const canSend = Boolean(draft.trim()) && !isLoading;
  const charsLeft = MAX_INPUT_CHARS - draft.length;
  const showCharCount = draft.length > CHAR_WARN_THRESHOLD;

  return (
    <section id="chat" className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="05 · AI Twin"
        title="Chat with my digital twin"
        subtitle="Ask about career decisions, measurable outcomes, and the story behind each chapter."
      />

      <div className="rounded-3xl border border-border bg-linear-to-br from-accent-soft-violet/35 via-background/95 to-accent-soft/35 p-5 shadow-sm backdrop-blur-sm sm:p-7">
        {/* Message list */}
        <div className="max-h-[480px] space-y-4 overflow-y-auto rounded-2xl border border-border bg-surface/80 p-4 sm:p-5">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={
                message.role === "user" ? "flex justify-end" : "flex justify-start gap-2"
              }
            >
              {/* Avatar only shown on assistant messages */}
              {message.role === "assistant" && (
                <span
                  aria-hidden
                  className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft-violet text-[10px] font-bold text-accent-violet"
                >
                  AK
                </span>
              )}
              <article
                className={
                  message.role === "assistant"
                    ? "max-w-[85%] rounded-2xl rounded-tl-sm bg-accent-soft p-3.5 text-sm leading-relaxed text-foreground dark:bg-accent-soft/25"
                    : "max-w-[85%] rounded-2xl rounded-tr-sm bg-accent-violet p-3.5 text-sm leading-relaxed text-white"
                }
              >
                {message.content}
              </article>
            </div>
          ))}

          {/* Animated typing indicator — replaces the plain "Thinking..." text */}
          {isLoading && (
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft-violet text-[10px] font-bold text-accent-violet"
              >
                AK
              </span>
              <span
                aria-label="Thinking…"
                className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-4 py-3 dark:bg-accent-soft/25"
              >
                {/* Three bouncing dots with staggered animation-delay for a typing effect */}
                <span className="size-1.5 animate-bounce rounded-full bg-accent [animation-delay:-0.3s]" />
                <span className="size-1.5 animate-bounce rounded-full bg-accent [animation-delay:-0.15s]" />
                <span className="size-1.5 animate-bounce rounded-full bg-accent" />
              </span>
            </div>
          )}

          {/* Invisible anchor element that we scrollIntoView after each update */}
          <div ref={messagesEndRef} />
        </div>

        {/* Starter question chips */}
        <div className="mt-5 flex flex-wrap gap-2">
          {STARTER_QUESTIONS.map((question) => (
            <button
              key={question}
              type="button"
              onClick={() => {
                void sendMessage(question);
              }}
              disabled={isLoading}
              className="rounded-full border border-border bg-background px-3.5 py-2 text-xs text-muted transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
            >
              {question}
            </button>
          ))}
        </div>

        {/* Input form */}
        <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="chat-input" className="sr-only">
            Ask the digital twin
          </label>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              id="chat-input"
              type="text"
              value={draft}
              onChange={(event) => {
                setDraft(event.target.value);
              }}
              placeholder="Ask about Aparana's career…"
              className="h-12 w-full rounded-full border border-border bg-background px-4 pr-14 text-sm text-foreground outline-none ring-accent transition focus-visible:ring-2"
              maxLength={MAX_INPUT_CHARS}
              disabled={isLoading}
            />
            {/* Character countdown, visible only near the limit */}
            {showCharCount && (
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[10px] text-muted">
                {charsLeft}
              </span>
            )}
          </div>
          <button
            type="submit"
            disabled={!canSend}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-linear-to-br from-accent to-accent-violet px-6 text-sm font-medium text-white transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Send
            {/* Paper-plane icon for visual clarity */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-4"
              aria-hidden
            >
              <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
            </svg>
          </button>
        </form>

        {/* Changed role from "status" to "alert" — errors need immediate announcement */}
        {error ? (
          <p className="mt-3 text-sm text-accent-warm" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </section>
  );
}

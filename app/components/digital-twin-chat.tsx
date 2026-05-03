"use client";

import { FormEvent, useMemo, useState } from "react";
import { SectionHeading } from "@/app/components/section-heading";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const STARTER_QUESTIONS = [
  "What are your strongest career highlights at Google?",
  "How did your transition from medicine to product happen?",
  "What kind of roles are you best suited for next?",
] as const;

export function DigitalTwinChatSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi, I am Aparana\'s digital twin. Ask me anything about her experience, education, leadership style, or career trajectory.",
    },
  ]);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSend = useMemo(
    () => Boolean(draft.trim()) && !isLoading,
    [draft, isLoading],
  );

  async function sendMessage(text: string) {
    const prompt = text.trim();
    if (!prompt || isLoading) {
      return;
    }

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
        headers: {
          "Content-Type": "application/json",
        },
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
        err instanceof Error ? err.message : "Unable to get a response right now.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await sendMessage(draft);
  }

  return (
    <section id="chat" className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="05 · AI Twin"
        title="Chat with my digital twin"
        subtitle="Powered by OpenRouter. Ask about career decisions, measurable outcomes, and the story behind each chapter."
      />

      <div className="rounded-3xl border border-border bg-linear-to-br from-accent-soft-violet/35 via-background/95 to-accent-soft/35 p-5 shadow-sm backdrop-blur-sm sm:p-7">
        <div className="max-h-[440px] space-y-4 overflow-y-auto rounded-2xl border border-border bg-surface/80 p-4 sm:p-5">
          {messages.map((message, index) => (
            <article
              key={`${message.role}-${index}`}
              className={
                message.role === "assistant"
                  ? "max-w-[92%] rounded-2xl rounded-tl-sm bg-accent-soft p-3.5 text-sm leading-relaxed text-foreground dark:bg-accent-soft/25"
                  : "ml-auto max-w-[92%] rounded-2xl rounded-tr-sm bg-accent-violet p-3.5 text-sm leading-relaxed text-white"
              }
            >
              {message.content}
            </article>
          ))}
          {isLoading ? (
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
              Thinking...
            </p>
          ) : null}
        </div>

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

        <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="chat-input" className="sr-only">
            Ask the digital twin
          </label>
          <input
            id="chat-input"
            type="text"
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
            }}
            placeholder="Ask a question about Aparana\'s career..."
            className="h-12 flex-1 rounded-full border border-border bg-background px-4 text-sm text-foreground outline-none ring-accent transition focus-visible:ring-2"
            maxLength={400}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!canSend}
            className="inline-flex h-12 items-center justify-center rounded-full bg-linear-to-br from-accent to-accent-violet px-6 text-sm font-medium text-white transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Send
          </button>
        </form>
        {error ? (
          <p className="mt-3 text-sm text-accent-warm" role="status">
            {error}
          </p>
        ) : null}
      </div>
    </section>
  );
}

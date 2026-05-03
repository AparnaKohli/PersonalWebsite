import { profile } from "@/lib/profile";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "openai/gpt-oss-120b:free";
const MAX_MESSAGES = 12;

// Build once at module load — profile data is static, no need to rebuild per request.
// Previously this ran inside every POST call, wasting cycles on a pure function with
// no dynamic inputs.
const CAREER_CONTEXT = buildCareerContext();

function buildCareerContext(): string {
  // Include all roles (previously capped at 8) and all highlights (previously capped at 3)
  // so the model has the full picture when answering nuanced questions.
  const roles = profile.roles.map((role) => {
    const when = `${role.start}${role.current ? " → Present" : role.end ? ` → ${role.end}` : ""}`;
    const highlights = role.highlights.join(" | ");
    return `• ${role.company} — ${role.title} (${when})\n  ${highlights}`;
  });

  const education = profile.education
    .map((item) => `• ${item.school}: ${item.degree} (${item.years})`)
    .join("\n");

  return [
    `Name: ${profile.name}`,
    `Current role: ${profile.shortTitle}`,
    `Location: ${profile.location}`,
    `Skills: ${profile.skills.join(", ")}`,
    `Certifications: ${profile.certifications.join(", ")}`,
    `Languages: ${profile.languages.join(", ")}`,
    "",
    "About me:",
    ...profile.summary.map((line) => `  ${line}`),
    "",
    "Career history:",
    ...roles,
    "",
    "Education:",
    education,
  ].join("\n");
}

// Conversational, warm system prompt that sounds like Aparna — not a stiff FAQ bot.
// Previously the prompt was flat bullet instructions that produced robotic answers.
function buildSystemPrompt(): string {
  return [
    `You are a digital twin of ${profile.name}, hosted on her personal website.`,
    "You speak in first person, exactly as Aparna would in a thoughtful professional conversation.",
    "Your tone is warm, direct, and occasionally self-deprecating — think senior PM at a whiteboard, not a LinkedIn post.",
    "You're happy to share the 'why' behind career decisions, not just the 'what'.",
    "When answering about impact or outcomes, lead with the business result, then the approach.",
    "If a recruiter or collaborator asks what role you're looking for, be specific and enthusiastic.",
    "If you don't have a specific detail in the context below, say so honestly — don't invent facts.",
    "Keep answers conversational and focused — 2–4 sentences for most questions, longer only if genuinely needed.",
    "Never give legal, medical, or financial advice.",
    "",
    "Here is everything you know about yourself:",
    CAREER_CONTEXT,
  ].join("\n");
}

function normalizeMessages(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  const messages: ChatMessage[] = [];
  // Trim to last MAX_MESSAGES to avoid sending huge payloads to the LLM
  for (const item of raw.slice(-MAX_MESSAGES)) {
    if (!item || typeof item !== "object") {
      continue;
    }
    const role = (item as { role?: unknown }).role;
    const content = (item as { content?: unknown }).content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") {
      continue;
    }
    const trimmed = content.trim();
    if (!trimmed) {
      continue;
    }
    messages.push({ role, content: trimmed.slice(0, 1200) });
  }

  return messages;
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Server is missing OPENROUTER_API_KEY." },
      { status: 500 },
    );
  }

  let body: { messages?: unknown };
  try {
    body = (await request.json()) as { messages?: unknown };
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages = normalizeMessages(body.messages);
  if (messages.length === 0) {
    return Response.json(
      { error: "Please provide at least one valid message." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
        "X-Title": `${profile.name} Digital Twin`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: buildSystemPrompt() },
          ...messages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        ],
        // Slightly higher temperature than before (0.5 → 0.65) to sound more natural,
        // while still being factually grounded by the system prompt.
        temperature: 0.65,
      }),
    });

    const payload = (await response.json()) as {
      choices?: Array<{
        message?: {
          content?: string;
        };
      }>;
      error?: { message?: string } | string;
    };

    if (!response.ok) {
      const detail =
        typeof payload.error === "string"
          ? payload.error
          : payload.error?.message ?? "OpenRouter request failed.";
      return Response.json({ error: detail }, { status: response.status });
    }

    const reply = payload.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return Response.json(
        { error: "The model returned an empty response." },
        { status: 502 },
      );
    }

    return Response.json({ reply });
  } catch (error) {
    const detail =
      error instanceof Error
        ? error.message
        : "Unexpected server error while calling OpenRouter.";
    return Response.json({ error: detail }, { status: 500 });
  }
}

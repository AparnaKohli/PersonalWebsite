import { profile } from "@/lib/profile";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "openai/gpt-oss-120b:free";
const MAX_MESSAGES = 12;

function asCareerContext(): string {
  const topRoles = profile.roles.slice(0, 8).map((role) => {
    const when = `${role.start}${role.current ? " to Present" : role.end ? ` to ${role.end}` : ""}`;
    const highlights = role.highlights.slice(0, 3).join(" | ");
    return `- ${role.company}: ${role.title} (${when}) -> ${highlights}`;
  });

  const education = profile.education
    .map((item) => `- ${item.school}: ${item.degree} (${item.years})`)
    .join("\n");

  return [
    `Name: ${profile.name}`,
    `Headline: ${profile.shortTitle}`,
    `Location: ${profile.location}`,
    `Skills: ${profile.skills.join(", ")}`,
    "Summary:",
    ...profile.summary.map((line) => `- ${line}`),
    "Roles:",
    ...topRoles,
    "Education:",
    education,
  ].join("\n");
}

function normalizeMessages(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  const messages: ChatMessage[] = [];
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

  const systemPrompt = [
    "You are Aparana Kohli's digital twin for her personal website.",
    "Answer in first person as Aparana with a professional, warm tone.",
    "Stay factual and only use the career context provided.",
    "If asked about unknown details, say you do not have that in the profile yet.",
    "Keep responses concise and useful for recruiters or collaborators.",
    "Do not provide legal, medical, or financial advice.",
    "Career context:",
    asCareerContext(),
  ].join("\n");

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
          { role: "system", content: systemPrompt },
          ...messages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        ],
        temperature: 0.5,
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

# Code Review — Aparana Kohli Personal Site

> Reviewed by Claude Sonnet 4.6 on 2026-05-03.  
> Branch: `claude/sad-wozniak-85a601`

---

## Architecture Overview

The site is a **Next.js 16 App Router** portfolio with one dynamic API route. All content lives in a single source-of-truth file (`lib/profile.ts`), which every component imports. The chatbot calls an internal route (`/api/digital-twin`) that proxies to OpenRouter.

```
app/
  layout.tsx                  Root HTML shell — fonts, SEO metadata, JSON-LD schema
  page.tsx                    Composes all page sections in order
  globals.css                 CSS custom properties (design tokens) + Tailwind 4
  components/
    site-header.tsx           Sticky navigation bar
    hero.tsx                  Above-the-fold section with CTA buttons
    brand-strip.tsx           Company logo/name row
    about-section.tsx         Summary paragraphs + skills grid
    experience-section.tsx    Grouped job cards with highlights
    education-section.tsx     Education cards
    portfolio-section.tsx     Placeholder with CTA
    digital-twin-chat.tsx     Client-side chat UI — calls the API
    contact-section.tsx       Phone / WhatsApp / email links
    site-footer.tsx           Links + copyright year
  api/
    digital-twin/route.ts     POST handler: builds system prompt → OpenRouter → reply
lib/
  profile.ts                  Single source of truth for all content
  site-description.ts         SEO meta description
  gmail-links.ts              Gmail compose URL builder
  contact-links.ts            tel: and WhatsApp URL builders
```

**Chatbot data flow:**
1. User types → `digital-twin-chat.tsx` manages local state
2. On submit → `POST /api/digital-twin` with the full message array
3. `route.ts` validates input, builds a system prompt from `profile.ts`, calls OpenRouter
4. Reply is returned and rendered into the message list

---

## Issues Found and Fixed

### 1. `lib/profile.ts` — Skills and certifications missing from resume

**Before**
```ts
skills: [
  "Product Management",
  "Personalisation Systems",
  "Growth & Monetisation",
  "Trust & Safety",
  "Measurement & Offline Conversions",
],
certifications: ["SQL for Beginner Data Analysis"],
```

**After**
```ts
skills: [
  "Product Management",
  "Personalisation Systems",
  "Growth & Monetisation",
  "Trust & Safety",
  "Measurement & Offline Conversions",
  "Python & SQL",
  "AI-Native Workflows",
],
certifications: [
  "SQL for Beginner Data Analysis",
  "Nanodegree — Foundations of Machine Learning (Udacity)",
],
```

**Why it matters:** The profile is the single source of truth for the chatbot context and the about section. Missing skills meant they were not surfaced to recruiters or to the AI twin.

---

### 2. `app/components/site-header.tsx` — Name hard-coded instead of reading from profile

**Before**
```tsx
<Link href="#top" ...>
  Aparana Kohli
</Link>
```

**After**
```tsx
import { profile } from "@/lib/profile";
// ...
<Link href="#top" ...>
  {profile.name}
</Link>
```

**Why it matters:** Hard-coding the name in the header creates a maintenance risk — if `profile.name` is ever updated, the header stays out of sync. Reading from the central constant removes that coupling.

---

### 3. `app/api/digital-twin/route.ts` — Career context rebuilt on every request

**Before**
```ts
export async function POST(request: Request) {
  // ...
  const systemPrompt = [
    "...",
    asCareerContext(),  // ← called inside the handler
  ].join("\n");
}
```

**After**
```ts
// Built once at module load — profile data is static
const CAREER_CONTEXT = buildCareerContext();

export async function POST(request: Request) {
  // uses CAREER_CONTEXT directly
}
```

**Why it matters:** `profile.ts` is a static import. Rebuilding the context string on every API call is wasted work. Moving it to module level means it runs once at startup.

---

### 4. `app/api/digital-twin/route.ts` — Role highlights truncated to 3

**Before**
```ts
const highlights = role.highlights.slice(0, 3).join(" | ");
```

**After**
```ts
const highlights = role.highlights.join(" | ");
```

**Why it matters:** The cap silently dropped real achievements from the AI's context. Roles like the Google Ads security work (which had 4 highlights) would lose the most important ones. The chatbot should have the full picture.

---

### 5. `app/api/digital-twin/route.ts` — System prompt was flat and robotic

**Before**
```
You are Aparana Kohli's digital twin for her personal website.
Answer in first person as Aparana with a professional, warm tone.
Stay factual and only use the career context provided.
...
```

**After**
```
You are a digital twin of Aparana Kohli, hosted on her personal website.
You speak in first person, exactly as Aparana would in a thoughtful professional conversation.
Your tone is warm, direct, and occasionally self-deprecating — think senior PM at a
whiteboard, not a LinkedIn post.
You're happy to share the 'why' behind career decisions, not just the 'what'.
When answering about impact or outcomes, lead with the business result, then the approach.
...
```

**Why it matters:** Flat instruction lists produce generic, FAQ-style answers. The revised prompt gives the model a persona, a tone, and a heuristic for structuring answers — which produces replies that sound like the real person.

---

### 6. `app/api/digital-twin/route.ts` — Temperature too low for conversational output

**Before**
```ts
temperature: 0.5,
```

**After**
```ts
temperature: 0.65,
```

**Why it matters:** 0.5 is good for factual retrieval but produces robotic-sounding prose in conversation. 0.65 adds natural variation while staying grounded by the system prompt.

---

### 7. `app/components/digital-twin-chat.tsx` — No scroll-to-bottom on new messages

**Before:** No scroll management. Replies appeared off-screen as the conversation grew.

**After**
```tsx
const messagesEndRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages, isLoading]);

// Inside the message list:
<div ref={messagesEndRef} />
```

**Why it matters:** A chat UI that doesn't scroll to the latest message forces the user to scroll manually every time — a basic UX failure.

---

### 8. `app/components/digital-twin-chat.tsx` — Input loses focus after sending

**Before:** After submitting a message, focus was lost and the user had to click back into the input.

**After**
```tsx
const inputRef = useRef<HTMLInputElement>(null);
// ...
finally {
  setIsLoading(false);
  inputRef.current?.focus();
}
```

**Why it matters:** In a chat interface, the user expects to keep typing after each send. Losing focus breaks the flow and adds unnecessary friction.

---

### 9. `app/components/digital-twin-chat.tsx` — Plain "Thinking..." text for loading state

**Before**
```tsx
{isLoading ? (
  <p className="font-mono text-xs ...">Thinking...</p>
) : null}
```

**After** — Animated three-dot typing indicator with staggered bounce:
```tsx
{isLoading && (
  <div className="flex items-center gap-2">
    <span aria-label="Thinking…" className="inline-flex items-center gap-1 ...">
      <span className="size-1.5 animate-bounce rounded-full bg-accent [animation-delay:-0.3s]" />
      <span className="size-1.5 animate-bounce rounded-full bg-accent [animation-delay:-0.15s]" />
      <span className="size-1.5 animate-bounce rounded-full bg-accent" />
    </span>
  </div>
)}
```

**Why it matters:** A pulsing typing indicator is the standard chat affordance. Plain monospace text feels like a debug message, not a polished product.

---

### 10. `app/components/digital-twin-chat.tsx` — `useMemo` for a plain boolean

**Before**
```tsx
const canSend = useMemo(
  () => Boolean(draft.trim()) && !isLoading,
  [draft, isLoading],
);
```

**After**
```tsx
const canSend = Boolean(draft.trim()) && !isLoading;
```

**Why it matters:** `useMemo` is for expensive computations or referential stability. Memoising a two-operand boolean adds overhead (the memo bookkeeping) while providing zero benefit. Over-use of `useMemo` also signals to future maintainers that this derivation is somehow complex — which is misleading.

---

### 11. `app/components/digital-twin-chat.tsx` — Error uses `role="status"` instead of `role="alert"`

**Before**
```tsx
<p className="mt-3 text-sm text-accent-warm" role="status">
  {error}
</p>
```

**After**
```tsx
<p className="mt-3 text-sm text-accent-warm" role="alert">
  {error}
</p>
```

**Why it matters:** `role="status"` is a polite live region — screen readers announce it at their next opportunity. `role="alert"` is assertive — it interrupts immediately. An error message needs `alert` so users with assistive technology learn about it right away.

---

### 12. `app/components/digital-twin-chat.tsx` — `sendMessage` recreated on every render

**Before:** `sendMessage` was a plain `async function` inside the component, recreated every render.

**After**
```tsx
const sendMessage = useCallback(async (text: string) => {
  // ...
}, [isLoading, messages]);
```

**Why it matters:** The function is passed as an `onClick` handler to each starter-question button. Without `useCallback`, every render creates a new function reference, which forces all those buttons to re-render even when nothing relevant changed.

---

## What Was Left Intentionally Unchanged

| Area | Rationale |
|------|-----------|
| `profile.name` ("Aparana") | Confirmed by owner — this is the intended spelling |
| Google One `start: "Aug 2025"` | Confirmed by owner — intentional date |
| OpenRouter model string | Deployment concern — not touched during UI review |
| `normalizeMessages` in route.ts | Already well-written with good defensive validation |
| CSS design tokens in `globals.css` | Correct and clean; no issues found |
| `groupByCompany` logic in `experience-section.tsx` | Clean algorithm; works correctly |

---

## Summary

| # | File | Issue | Severity | Status |
|---|------|--------|----------|--------|
| 1 | `lib/profile.ts` | Skills + certifications missing from resume | Medium | ✅ Fixed |
| 2 | `site-header.tsx` | Name hard-coded instead of from profile | Medium | ✅ Fixed |
| 3 | `route.ts` | Career context rebuilt per request | Low | ✅ Fixed |
| 4 | `route.ts` | Role highlights capped at 3 | Medium | ✅ Fixed |
| 5 | `route.ts` | Robotic, flat system prompt | High | ✅ Fixed |
| 6 | `route.ts` | Temperature too low for conversation | Low | ✅ Fixed |
| 7 | `digital-twin-chat.tsx` | No scroll-to-bottom on new messages | High | ✅ Fixed |
| 8 | `digital-twin-chat.tsx` | Input loses focus after send | Low | ✅ Fixed |
| 9 | `digital-twin-chat.tsx` | Plain "Thinking..." text | Low | ✅ Fixed |
| 10 | `digital-twin-chat.tsx` | `useMemo` for a plain boolean | Low | ✅ Fixed |
| 11 | `digital-twin-chat.tsx` | `role="status"` on error (should be `"alert"`) | Medium | ✅ Fixed |
| 12 | `digital-twin-chat.tsx` | `sendMessage` not wrapped in `useCallback` | Low | ✅ Fixed |

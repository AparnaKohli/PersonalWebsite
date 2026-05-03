/** Opens Gmail compose in the browser with `to` (and optional subject) prefilled. */
export function gmailComposeHref(to: string, subject?: string): string {
  const url = new URL("https://mail.google.com/mail/");
  url.searchParams.set("view", "cm");
  url.searchParams.set("fs", "1");
  url.searchParams.set("to", to);
  if (subject) {
    url.searchParams.set("su", subject);
  }
  return url.toString();
}

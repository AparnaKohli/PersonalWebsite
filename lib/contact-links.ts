/** `tel:` href from display or E.164 string (non-digits stripped). */
export function telHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `tel:+${digits}`;
}

export function whatsAppHref(waMeDigits: string): string {
  return `https://wa.me/${waMeDigits.replace(/\D/g, "")}`;
}

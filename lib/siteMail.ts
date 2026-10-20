import nodemailer from "nodemailer";
import { SUPPORT_EMAIL } from "./contact";

// Server-only: imported by the API routes, which run as Vercel functions. Env vars without
// NEXT_PUBLIC_ never reach the browser bundle.
//
// SES over SMTP with the same MAIL_SMTP_* credentials the Cove gateway uses. These are SES *SMTP*
// credentials, which cannot sign SES API calls, so the AWS SDK is not an option with them.
// No pooling: a serverless function may be frozen between requests, stranding pooled sockets.
const SMTP_PORT = Number(process.env.MAIL_SMTP_PORT ?? 587);
const smtp = nodemailer.createTransport({
  host: process.env.MAIL_SMTP_HOST,
  port: SMTP_PORT,
  // STARTTLS on 587, implicit TLS on 465.
  secure: SMTP_PORT === 465,
  requireTLS: true,
  auth: { user: process.env.MAIL_SMTP_USER, pass: process.env.MAIL_SMTP_PASS },
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 20_000,
});

const FROM = process.env.CONTACT_FROM_EMAIL ?? `Qasara Website <${SUPPORT_EMAIL}>`;
const TO = process.env.CONTACT_TO_EMAIL ?? SUPPORT_EMAIL;
const SMTP_CONFIGURED = Boolean(
  process.env.MAIL_SMTP_HOST && process.env.MAIL_SMTP_USER && process.env.MAIL_SMTP_PASS,
);

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const SEND_FAILED = `We couldn't send your message. Please try again, or email ${SUPPORT_EMAIL}.`;

/** Emails the support inbox. Throws on failure; callers turn that into a 502. */
export async function mailSupport(mail: {
  subject: string;
  text: string;
  html: string;
  replyTo: { name?: string; address: string };
}): Promise<void> {
  if (!SMTP_CONFIGURED) throw new Error("MAIL_SMTP_HOST / MAIL_SMTP_USER / MAIL_SMTP_PASS not set");
  const info = await smtp.sendMail({ from: FROM, to: TO, ...mail });
  console.log("[mail] sent", mail.subject, info.messageId);
}

export function field(form: FormData, key: string): string {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/** For values that end up in mail headers. */
export function oneLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ");
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** A label/value table, the body every site form email shares. */
export function htmlRows(rows: [string, string][]): string {
  return `<table cellpadding="4" style="font-family:sans-serif;font-size:14px">${rows
    .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`)
    .join("")}</table>`;
}

// Site forms post by fetch when JS is on (JSON reply); without JS it is a plain POST, so redirect
// back to the form's page and let its banner report the outcome.
export function formReply(
  request: Request,
  page: string,
  status: number,
  error?: string,
): Response {
  if (request.headers.get("accept")?.includes("application/json")) {
    return Response.json(error ? { ok: false, error } : { ok: true }, { status });
  }
  const target = new URL(page, request.url);
  if (error) target.searchParams.set("error", error);
  else target.searchParams.set("success", "true");
  return Response.redirect(target, 303);
}

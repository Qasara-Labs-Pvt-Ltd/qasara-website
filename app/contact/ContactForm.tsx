"use client";

import { Suspense, useState, type FormEvent, type ReactNode } from "react";
import { Send } from "lucide-react";
import { ENQUIRY_TYPES, SUPPORT_EMAIL } from "@/lib/contact";
import { ErrorNotice, SentNotice, SuccessBanner } from "./SuccessBanner";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "done" } | { kind: "error"; message: string };

const ACTION = "/api/contact";

// With JS on we post by fetch and report the outcome in place; without JS the plain POST still
// works and the API redirects back with ?success or ?error for SuccessBanner to show.
export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus({ kind: "sending" });
    try {
      const res = await fetch(ACTION, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      const body = (await res.json().catch(() => null)) as { error?: string } | null;
      if (res.ok) {
        form.reset();
        setStatus({ kind: "done" });
      } else {
        setStatus({ kind: "error", message: body?.error ?? genericError });
      }
    } catch {
      setStatus({ kind: "error", message: genericError });
    }
  }

  return (
    <>
      {status.kind === "idle" && (
        <Suspense fallback={null}>
          <SuccessBanner />
        </Suspense>
      )}
      {status.kind === "done" && <SentNotice />}
      {status.kind === "error" && <ErrorNotice message={status.message} />}

      <form action={ACTION} method="POST" onSubmit={onSubmit} className="mt-8 flex flex-col gap-5">
        {/* Honeypot: hidden from people, filled by bots. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <Field label="Name" required>
          <input type="text" name="name" required maxLength={200} autoComplete="name" className="form-input" />
        </Field>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Email" required>
            <input type="email" name="email" required maxLength={254} autoComplete="email" className="form-input" />
          </Field>
          <Field label="Company">
            <input type="text" name="company" maxLength={200} autoComplete="organization" className="form-input" />
          </Field>
        </div>

        <Field label="Enquiry type">
          <select name="enquiry_type" className="form-input appearance-none pr-10" defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            {ENQUIRY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Message" required>
          <textarea name="message" required maxLength={5000} rows={6} className="form-input resize-y" />
        </Field>

        <div className="pt-2">
          <button type="submit" className="btn-primary" disabled={status.kind === "sending"}>
            {status.kind === "sending" ? "Sending…" : "Send Message"}
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </>
  );
}

const genericError = `That didn't go through. Please try again, or email ${SUPPORT_EMAIL}.`;

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
        {label}
        {required && <span className="ml-1 text-brand-teal">*</span>}
      </span>
      {children}
    </label>
  );
}

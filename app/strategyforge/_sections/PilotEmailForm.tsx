"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

type Status = "idle" | "sending" | "done" | "error";

// Formspree's free plan ignores _next and shows its own thank-you page, so with JS on we submit
// by fetch (Formspree's AJAX mode) and thank the visitor in place. Without JS the plain POST still works.
export function PilotEmailForm({ action }: { action: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(action, {
        method: "POST",
        body: new FormData(event.currentTarget),
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div role="status" aria-live="polite" className="sf-success sf-success-inline">
        <CheckCircle2 strokeWidth={1.75} aria-hidden="true" />
        <p>You&apos;re on the list. We&apos;ll email you when your spot opens.</p>
      </div>
    );
  }

  return (
    <>
      <form action={action} method="POST" className="sf-email" onSubmit={onSubmit}>
        <input type="hidden" name="_next" value="https://qasara.ai/strategyforge?success=true" />
        <input type="hidden" name="_subject" value="StrategyForge — pilot waitlist" />
        <input type="hidden" name="product" value="strategyforge" />
        <input type="hidden" name="source" value="sf-page-v2" />
        <label htmlFor="sf-join-email" className="sf-sr-only">
          Email
        </label>
        <input
          id="sf-join-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@email.com"
        />
        <button type="submit" className="sf-btn sf-btn-sm" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Join the pilot"}
        </button>
      </form>
      {status === "error" && (
        <p role="alert" className="sf-form-error">
          That didn&apos;t go through. Please try again, or email admin@qasara.ai.
        </p>
      )}
    </>
  );
}

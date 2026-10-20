"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

type Status = "idle" | "sending" | "done" | "error";

const GENERIC_ERROR = "That didn't go through. Please try again, or email support@qasara.ai.";

// With JS on we submit by fetch and thank the visitor in place. Without JS the plain POST still works:
// the API redirects back to /strategyforge?success=true (or ?error=...) for SuccessBanner to show.
export function PilotEmailForm({ action }: { action: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState(GENERIC_ERROR);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(action, {
        method: "POST",
        body: new FormData(event.currentTarget),
        headers: { Accept: "application/json" },
      });
      const body = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(body?.error ?? GENERIC_ERROR);
      setStatus(res.ok ? "done" : "error");
    } catch {
      setError(GENERIC_ERROR);
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
        <input type="hidden" name="product" value="strategyforge" />
        <input type="hidden" name="source" value="sf-page-v2" />
        {/* Honeypot: hidden from people, filled by bots. */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="sf-sr-only" />
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
          {error}
        </p>
      )}
    </>
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2 } from "lucide-react";

// Reports the outcome of a no-JS form post, which the API redirects back here with ?success or ?error.
export function SuccessBanner() {
  const params = useSearchParams();
  const error = params.get("error");
  if (error) return <ErrorNotice message={error} />;
  if (params.get("success") !== "true") return null;
  return <SentNotice />;
}

export function SentNotice() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mb-8 flex items-start gap-4 rounded-2xl border border-brand-teal/40 bg-brand-teal/10 px-5 py-4 text-sm text-brand-mint backdrop-blur-sm"
    >
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.75} />
      <div>
        <p className="font-medium text-ink">Message received.</p>
        <p className="mt-1 text-ink-muted">
          Thank you — we will be in touch shortly.
        </p>
      </div>
    </div>
  );
}

export function ErrorNotice({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="mb-8 flex items-start gap-4 rounded-2xl border border-red-500/40 bg-red-500/10 px-5 py-4 text-sm text-red-300 backdrop-blur-sm"
    >
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.75} />
      <div>
        <p className="font-medium text-ink">Message not sent.</p>
        <p className="mt-1 text-ink-muted">{message}</p>
      </div>
    </div>
  );
}

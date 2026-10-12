"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

// Rendered at the top of the page: Formspree lands the user there after submitting.
export function SuccessBanner() {
  const params = useSearchParams();
  if (params.get("success") !== "true") return null;

  return (
    <div className="sf-success-wrap">
      <div role="status" aria-live="polite" className="sf-success">
        <CheckCircle2 strokeWidth={1.75} aria-hidden="true" />
        <p>You&apos;re on the list. We&apos;ll email you when your spot opens.</p>
      </div>
    </div>
  );
}

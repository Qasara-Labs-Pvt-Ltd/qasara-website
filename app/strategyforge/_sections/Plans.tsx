import type { ReactElement } from "react";
import { PLANS, type PlanId } from "../content";

const ICONS: Record<PlanId, ReactElement> = {
  spread: (
    <svg viewBox="0 0 96 36" aria-hidden="true">
      <g stroke="#f0b429" strokeWidth="2">
        <line x1="6" y1="8" x2="90" y2="8" opacity=".9" />
        <line x1="6" y1="14" x2="90" y2="14" opacity=".55" />
        <line x1="6" y1="22" x2="90" y2="22" stroke="#34d399" opacity=".55" />
        <line x1="6" y1="28" x2="90" y2="28" stroke="#34d399" opacity=".9" />
      </g>
    </svg>
  ),
  dca: (
    <svg viewBox="0 0 96 36" aria-hidden="true">
      <g fill="#f0b429">
        <rect x="8" y="22" width="10" height="10" rx="2" />
        <rect x="28" y="22" width="10" height="10" rx="2" opacity=".8" />
        <rect x="48" y="22" width="10" height="10" rx="2" opacity=".6" />
        <rect x="68" y="22" width="10" height="10" rx="2" opacity=".4" />
      </g>
      <path d="M6 14 H88" stroke="#6f7077" strokeWidth="1.5" strokeDasharray="3 4" />
    </svg>
  ),
  trigger: (
    <svg viewBox="0 0 96 36" aria-hidden="true">
      <path d="M4 28 L22 22 L38 26 L56 14 L72 18 L92 8" stroke="#a3a4ab" strokeWidth="2" fill="none" />
      <path d="M4 14 H92" stroke="#f0b429" strokeWidth="1.5" strokeDasharray="4 3" />
      <circle cx="56" cy="14" r="4" fill="#f0b429" />
    </svg>
  ),
  trailing: (
    <svg viewBox="0 0 96 36" aria-hidden="true">
      <path d="M4 30 L24 22 L40 16 L58 8 L72 14 L90 24" stroke="#34d399" strokeWidth="2" fill="none" />
      <path d="M4 34 L24 28 L40 22 L58 14 L90 14" stroke="#fb6a78" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
    </svg>
  ),
  arb: (
    <svg viewBox="0 0 96 36" aria-hidden="true">
      <path d="M4 26 C30 26 30 10 48 10" stroke="#f0b429" strokeWidth="2" fill="none" />
      <path d="M48 10 C66 10 66 26 92 26" stroke="#34d399" strokeWidth="2" fill="none" />
      <circle cx="48" cy="10" r="3" fill="#f0b429" />
    </svg>
  ),
  swap: (
    <svg viewBox="0 0 96 36" aria-hidden="true">
      <path d="M10 12 H70 m-8 -6 l8 6 l-8 6" stroke="#f0b429" strokeWidth="2" fill="none" />
      <path d="M86 24 H26 m8 -6 l-8 6 l8 6" stroke="#34d399" strokeWidth="2" fill="none" />
    </svg>
  ),
};

export function Plans() {
  return (
    <section className="sf-section">
      <div className="sf-eyebrow">Plans</div>
      <h2>Tell it what to do.</h2>
      <p className="sf-lead">Each agent runs one plan at a time, so you always know what it&apos;s doing.</p>
      <div className="sf-plans">
        {PLANS.map((p) => (
          <div key={p.id} className="sf-plan">
            <h3>{p.title}</h3>
            {ICONS[p.id]}
            <p className="sf-what">{p.what}</p>
            <div className="sf-meta">
              {p.chips.map((c) => (
                <span key={c} className="sf-chip">
                  {c}
                </span>
              ))}
              {p.brain && <span className="sf-chip sf-chip-gold">◆ brain available</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

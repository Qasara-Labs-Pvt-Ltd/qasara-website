import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";

type Badge = {
  label: string;
  tone: "teal" | "amber" | "blue";
};

export function ProductCard({
  index,
  title,
  description,
  href,
  cta,
  badge,
  icon,
  accent = "teal",
}: {
  index: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  badge: Badge;
  icon?: ReactNode;
  accent?: "teal" | "purple";
}) {
  const accentRing =
    accent === "purple"
      ? "before:from-brand-purple/40 before:via-brand-blue/30"
      : "before:from-brand-teal/40 before:via-brand-blue/30";

  const accentGlow =
    accent === "purple"
      ? "from-brand-purple/10 via-transparent to-transparent"
      : "from-brand-teal/10 via-transparent to-transparent";

  const pillClass =
    badge.tone === "teal"
      ? "pill pill-teal"
      : badge.tone === "amber"
      ? "pill pill-amber"
      : "pill pill-blue";

  return (
    <Link
      href={href}
      className={`group relative isolate flex flex-col overflow-hidden rounded-2xl border border-line bg-bg-card/60 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-line/0 trace-border`}
    >
      {/* Accent glow */}
      <div
        className={`pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br ${accentGlow} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
      />

      {/* Top row: index + badge */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-dim">
          {index}
        </span>
        <span className={pillClass}>
          <span className="pill-dot pill-dot-pulse" aria-hidden />
          {badge.label}
        </span>
      </div>

      {/* Icon */}
      {icon && (
        <div className="mt-12 flex h-16 w-16 items-center justify-center rounded-xl border border-line bg-bg-elevated text-brand-teal transition-transform duration-500 group-hover:scale-105">
          {icon}
        </div>
      )}

      {/* Title */}
      <h3 className="mt-8 text-2xl font-semibold tracking-tight md:text-[1.7rem]">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-muted">
        {description}
      </p>

      {/* CTA */}
      <div className="mt-auto pt-10">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors group-hover:text-brand-mint">
          {cta}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}

"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Tone = "default" | "teal" | "purple";

export function HeroSection({
  eyebrow,
  title,
  subtitle,
  tagline,
  actions,
  tone = "default",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  tagline?: string;
  actions?: ReactNode;
  tone?: Tone;
  children?: ReactNode;
}) {
  const nebulaClass =
    tone === "teal"
      ? "nebula nebula--teal"
      : tone === "purple"
      ? "nebula nebula--purple"
      : "nebula";

  return (
    <section className="relative isolate overflow-hidden pt-24 pb-24 md:pt-32 md:pb-32">
      <div className={nebulaClass} />
      <div className="grid-overlay" />
      <div className="vignette" />
      <div className="grain" />

      <div className="container-page relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          {eyebrow && (
            <div className="eyebrow mb-7">
              <span className="eyebrow-dot" aria-hidden />
              <span>{eyebrow}</span>
            </div>
          )}

          <h1 className="display-h1 text-balance">{title}</h1>

          {subtitle && (
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl">
              {subtitle}
            </p>
          )}

          {tagline && (
            <p className="mt-5 font-mono text-sm italic tracking-tight text-brand-mint/90">
              {tagline}
            </p>
          )}

          {actions && (
            <div className="mt-10 flex flex-wrap items-center gap-4">
              {actions}
            </div>
          )}
        </motion.div>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}

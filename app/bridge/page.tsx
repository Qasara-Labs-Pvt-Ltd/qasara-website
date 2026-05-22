import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Lock,
  ShieldCheck,
  Coins,
  CheckCircle2,
  Circle,
  Hourglass,
} from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Canton Bridge",
  description:
    "Move assets between Ethereum and Canton Network. Atomic, trustless, institutional cross-chain settlement with no custodian risk.",
};

const steps = [
  {
    n: "01",
    title: "Lock",
    body: "Lock your asset on Ethereum in the bridge contract.",
  },
  {
    n: "02",
    title: "Verify",
    body: "Canton Bridge nodes confirm the lock via threshold signatures.",
  },
  {
    n: "03",
    title: "Mint",
    body: "Equivalent Canton-native token minted atomically on Canton.",
  },
  {
    n: "04",
    title: "Use",
    body: "Trade, lend, or settle your asset natively on Canton.",
  },
];

const benefits = [
  {
    title: "No Custodian Risk",
    body: "No single party holds your assets. Threshold multi-sig across independent nodes.",
    icon: <ShieldCheck className="h-6 w-6" strokeWidth={1.5} />,
  },
  {
    title: "Atomic Safety",
    body: "If the Canton mint fails, the source chain lock is released. You cannot lose funds to a partial bridge failure.",
    icon: <Lock className="h-6 w-6" strokeWidth={1.5} />,
  },
  {
    title: "Institutional Assets",
    body: "Designed for high-value transfers — tokenised bonds, equities, stablecoins — not just crypto.",
    icon: <Coins className="h-6 w-6" strokeWidth={1.5} />,
  },
];

const status = [
  { icon: <CheckCircle2 className="h-4 w-4" />, label: "Architecture designed", tone: "done" },
  { icon: <Circle className="h-4 w-4 animate-pulse" />, label: "Development in progress", tone: "active" },
  { icon: <Hourglass className="h-4 w-4" />, label: "Testnet — Coming", tone: "pending" },
  { icon: <Hourglass className="h-4 w-4" />, label: "MainNet — Coming", tone: "pending" },
];

export default function BridgePage() {
  return (
    <>
      {/* HERO */}
      <HeroSection
        tone="purple"
        eyebrow="Product · Bridge"
        title={
          <>
            Canton
            <br />
            <span className="bg-gradient-to-br from-brand-purple via-brand-blue to-brand-teal bg-clip-text text-transparent">
              Bridge
            </span>
          </>
        }
        subtitle="Move assets between Ethereum and Canton Network. Atomic. Trustless. Institutional."
        actions={
          <span className="pill pill-amber">
            <span className="pill-dot pill-dot-pulse" aria-hidden />
            In Build
          </span>
        }
      />

      {/* PROBLEM / SOLUTION */}
      <section className="relative py-24 md:py-32">
        <div className="container-page">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
            <Reveal>
              <div className="h-full bg-bg p-10 md:p-12">
                <div className="eyebrow mb-6">
                  <span className="text-brand-purple/80">01</span>
                  <span className="eyebrow-dot" aria-hidden />
                  <span>The Problem</span>
                </div>
                <h3 className="display-h3 text-balance">
                  Liquidity is on Ethereum.
                  <br />
                  Institutional rails are on Canton.
                </h3>
                <p className="mt-6 text-[16px] leading-relaxed text-ink-muted">
                  Canton Network is where institutional DeFi is being built.
                  JPMorgan, Goldman Sachs, DTCC, Societe Generale are all here.
                  But the world&apos;s liquidity is still on Ethereum and other
                  public chains. Moving assets between these networks today
                  means trusting centralised bridges — which have been
                  exploited for billions.
                </p>
              </div>
            </Reveal>

            <Reveal index={1}>
              <div className="h-full bg-bg p-10 md:p-12">
                <div className="eyebrow mb-6">
                  <span className="text-brand-teal/80">02</span>
                  <span className="eyebrow-dot" aria-hidden />
                  <span>The Solution</span>
                </div>
                <h3 className="display-h3 text-balance">
                  Atomic settlement.
                  <br />
                  No custodian. No partial failure.
                </h3>
                <p className="mt-6 text-[16px] leading-relaxed text-ink-muted">
                  Canton Bridge uses Canton&apos;s atomic settlement model to
                  move assets without a custodian. Assets are locked on the
                  source chain, verified across independent nodes, and minted
                  on Canton in a single atomic operation. If anything fails,
                  the source chain lock is released automatically. You cannot
                  lose funds to a partial bridge failure.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SUPPORTED CHAINS */}
      <section className="relative py-24 md:py-32 bg-bg-subtle/40">
        <div className="container-page">
          <SectionHeader
            index="03"
            eyebrow="Supported Chains"
            title="The first route."
            align="center"
          />

          <Reveal>
            <div className="mt-16 flex flex-col items-center gap-10">
              <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12">
                <ChainNode label="Ethereum" gradient="from-[#627EEA] to-[#8A92B2]" />
                <div className="relative h-px w-32 sm:h-px sm:w-48">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#627EEA]/60 via-brand-purple/60 to-brand-teal/80" />
                  <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-brand-purple shadow-[0_0_20px_rgba(124,58,237,0.7)] animate-pulse-soft" />
                </div>
                <ChainNode label="Canton Network" gradient="from-brand-teal to-brand-blue" />
              </div>
              <p className="text-sm text-ink-muted">
                Additional chains in development.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative py-24 md:py-32">
        <div className="container-page">
          <SectionHeader
            index="04"
            eyebrow="How it Works"
            title="Four atomic steps. One settlement."
          />

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.n} index={i}>
                <div className="relative h-full bg-bg p-8 md:p-10">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand-purple/70">
                    Step {step.n}
                  </span>
                  <h3 className="mt-8 text-xl font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                    {step.body}
                  </p>
                  {i < steps.length - 1 && (
                    <div className="pointer-events-none absolute -right-4 top-1/2 hidden h-px w-8 -translate-y-1/2 bg-gradient-to-r from-brand-purple/60 to-transparent lg:block" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY BRIDGE */}
      <section className="relative py-24 md:py-32 bg-bg-subtle/40">
        <div className="container-page">
          <SectionHeader
            index="05"
            eyebrow="Why Canton Bridge"
            title="Designed for institutional value transfer."
          />

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {benefits.map((b, i) => (
              <Reveal key={b.title} index={i}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-bg-card/60 p-8 transition-all duration-500 hover:-translate-y-0.5 hover:border-brand-purple/40">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-purple/[0.06] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-line bg-bg-elevated text-brand-purple transition-transform duration-500 group-hover:scale-105">
                      {b.icon}
                    </div>
                    <h3 className="mt-8 text-xl font-semibold tracking-tight">
                      {b.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                      {b.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATUS */}
      <section className="relative py-24 md:py-32">
        <div className="container-page">
          <SectionHeader
            index="06"
            eyebrow="Status"
            title="Honest milestones. No dates we can't keep."
          />

          <Reveal>
            <ul className="mt-12 flex flex-col gap-3 max-w-xl">
              {status.map((s) => (
                <li
                  key={s.label}
                  className="flex items-center gap-4 rounded-xl border border-line bg-bg-card/50 px-5 py-4"
                >
                  <span
                    className={
                      s.tone === "done"
                        ? "text-brand-mint"
                        : s.tone === "active"
                        ? "text-brand-amber"
                        : "text-ink-dim"
                    }
                  >
                    {s.icon}
                  </span>
                  <span
                    className={
                      s.tone === "pending"
                        ? "text-sm text-ink-muted"
                        : "text-sm text-ink"
                    }
                  >
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-32">
        <div className="container-page">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-line bg-bg-card/60 p-10 md:p-16">
              <div className="pointer-events-none absolute -top-32 -right-32 h-[24rem] w-[24rem] rounded-full bg-brand-purple/15 blur-[110px]" />
              <div className="pointer-events-none absolute -bottom-32 -left-32 h-[22rem] w-[22rem] rounded-full bg-brand-blue/10 blur-[100px]" />

              <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
                <h2 className="display-h2 max-w-2xl text-balance">
                  Interested in Canton Bridge for your institution?
                </h2>
                <Link href="/contact" className="btn-primary shrink-0">
                  Get in Touch
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ChainNode({ label, gradient }: { label: string; gradient: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`relative flex h-24 w-24 items-center justify-center rounded-2xl border border-line bg-bg-card/70 backdrop-blur-sm`}
      >
        <div
          className={`absolute inset-1 rounded-xl bg-gradient-to-br ${gradient} opacity-20`}
        />
        <div
          className={`relative h-3 w-3 rounded-full bg-gradient-to-br ${gradient} shadow-[0_0_24px_rgba(255,255,255,0.2)]`}
        />
      </div>
      <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink">
        {label}
      </span>
    </div>
  );
}

// app/strategyforge/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  KeyRound,
  Bot,
  ArrowLeftRight,
  LineChart,
  Clock,
  UserCheck,
  Landmark,
} from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "StrategyForge",
  description:
    "Non-custodial automated market-making on Canton Network. Run strategies on your own venue accounts — your keys never leave your control.",
  openGraph: {
    title: "StrategyForge — Automated market-making on Canton",
    description:
      "Non-custodial automated market-making on Canton Network. Request early access.",
  },
};

const steps = [
  {
    icon: <KeyRound className="h-6 w-6" strokeWidth={1.5} />,
    title: "Your keys stay yours",
    body: "The signing sidecar runs on your own infrastructure. StrategyForge never holds funds and never sees your keys.",
  },
  {
    icon: <Bot className="h-6 w-6" strokeWidth={1.5} />,
    title: "Strategies compute the orders",
    body: "Grid market-making runs around the clock — quoting, rebalancing, and managing inventory. More strategies are on the way.",
  },
  {
    icon: <ArrowLeftRight className="h-6 w-6" strokeWidth={1.5} />,
    title: "You trade your own accounts",
    body: "Orders execute on your own Canton venue accounts. Your balances, your venue relationships, your control.",
  },
];

const strategies = [
  {
    title: "Market-making (grid)",
    badge: null,
    body: "Continuous two-sided quoting with inventory skew, volatility-adaptive offsets, and directional-move protection.",
  },
  {
    title: "Cross-venue arbitrage",
    badge: "Early access",
    body: "Capture price differences between Canton venues with atomic, pre-checked execution.",
  },
];

const venues = [
  { name: "Temple", kind: "Central limit order book" },
  { name: "Tradecraft", kind: "AMM" },
  { name: "More venues", kind: "Coming soon" },
];

const whyItems = [
  {
    icon: <LineChart className="h-5 w-5" strokeWidth={1.5} />,
    title: "Canton-native",
    body: "Built for Canton Network venues from day one — settlement, gas, and venue mechanics handled for you.",
  },
  {
    icon: <Clock className="h-5 w-5" strokeWidth={1.5} />,
    title: "Runs 24/7, unattended",
    body: "Deploy a strategy and let it work — with health monitoring, funding automation, and safety halts built in.",
  },
  {
    icon: <UserCheck className="h-5 w-5" strokeWidth={1.5} />,
    title: "Your accounts, your control",
    body: "Trade under your own venue accounts. Pause, adjust, or walk away at any time — nothing is locked up with us.",
  },
];

const faqs = [
  {
    q: "Does StrategyForge ever hold my funds?",
    a: "No. StrategyForge is non-custodial by construction: the signing sidecar runs on your own infrastructure and your keys never leave it. We can't touch your funds — by design, not by policy.",
  },
  {
    q: "Which venues are supported?",
    a: "Temple (central limit order book) and Tradecraft (AMM) today, with more Canton venues coming.",
  },
  {
    q: "Is it generally available?",
    a: "Not yet — StrategyForge is in early access. Request access below and we'll be in touch.",
  },
];

export default function StrategyForgePage() {
  return (
    <>
      <HeroSection
        eyebrow="StrategyForge"
        tone="teal"
        title={
          <>
            Automated market-making on Canton,{" "}
            <span className="bg-gradient-to-br from-brand-mint via-brand-teal to-brand-blue bg-clip-text text-transparent">
              non-custodial by design.
            </span>
          </>
        }
        subtitle="Run automated trading strategies on Canton Network venues — for trading teams and individual traders. Your keys never leave your control."
        actions={
          <div className="flex flex-wrap items-center gap-4">
            <Link href="#early-access" className="btn-primary">
              Request early access
            </Link>
            <Link href="#how-it-works" className="btn-ghost">
              See how it works
            </Link>
          </div>
        }
      />

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="relative py-20 md:py-28">
        <div className="container-page">
          <SectionHeader
            index="01"
            eyebrow="How it works"
            title="Non-custodial, end to end"
            description="StrategyForge separates strategy from custody. We run the strategies; you keep the keys."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.title} index={i}>
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-line bg-bg-card/60 p-7">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-bg-elevated text-brand-teal">
                    {s.icon}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">
                    Step {i + 1}
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
                  <p className="text-[15px] leading-relaxed text-ink-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STRATEGIES */}
      <section className="relative py-20 md:py-28">
        <div className="container-page">
          <SectionHeader
            index="02"
            eyebrow="Strategies"
            title="What you can run"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {strategies.map((s, i) => (
              <Reveal key={s.title} index={i}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-bg-card/60 p-7">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
                    {s.badge && <span className="pill pill-amber">{s.badge}</span>}
                  </div>
                  <p className="text-[15px] leading-relaxed text-ink-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink-dim">More strategies coming.</p>
        </div>
      </section>

      {/* VENUES */}
      <section className="relative py-20 md:py-28">
        <div className="container-page">
          <SectionHeader index="03" eyebrow="Venues" title="Where it runs" />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {venues.map((v, i) => (
              <Reveal key={v.name} index={i}>
                <div className="rounded-2xl border border-line bg-bg-card/50 p-6">
                  <div className="text-base font-semibold">{v.name}</div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-dim">
                    {v.kind}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="relative py-20 md:py-28">
        <div className="container-page">
          <SectionHeader index="04" eyebrow="Why StrategyForge" title="Built for Canton, run by you" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {whyItems.map((w, i) => (
              <Reveal key={w.title} index={i}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-bg-card/60 p-7">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-bg-elevated text-brand-teal">
                    {w.icon}
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">{w.title}</h3>
                  <p className="text-[15px] leading-relaxed text-ink-muted">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER STRIP */}
      <section className="relative py-10">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-line bg-bg-card/50 p-7 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-bg-elevated text-brand-teal">
                  <Landmark className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <p className="text-[15px] leading-relaxed text-ink-muted">
                  Running a Canton venue and looking for liquidity?{" "}
                  <span className="text-ink">Let&apos;s talk.</span>
                </p>
              </div>
              <Link href="/contact" className="btn-ghost shrink-0">
                Contact us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20 md:py-28">
        <div className="container-page">
          <SectionHeader index="05" eyebrow="FAQ" title="Common questions" />
          <div className="mt-12 flex max-w-3xl flex-col gap-4">
            {faqs.map((f, i) => (
              <Reveal key={f.q} index={i}>
                <div className="rounded-2xl border border-line bg-bg-card/50 p-6">
                  <h3 className="text-base font-semibold tracking-tight">{f.q}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EARLY ACCESS — form lands here in Task 2 */}
      <section id="early-access" className="relative pb-24 md:pb-32" />
    </>
  );
}

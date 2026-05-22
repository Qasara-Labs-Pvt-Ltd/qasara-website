import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  ArrowRight,
  ArrowUpRight,
  Coins,
  Send,
  Inbox,
  Layers,
  Combine,
  Lock,
  Building2,
  Network,
  Briefcase,
} from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Cove Wallet API",
  description:
    "Institutional-grade wallet infrastructure for Canton Network. CIP-56 compliant. Simple REST API. A safe harbour for institutional digital assets.",
};

const tickList = [
  "CIP-56 compliant — standard Canton token interfaces",
  "Multi-asset — Canton Coin and any CIP-56 token",
  "Auth0 / OAuth2 authentication",
  "REST + JSON — no gRPC complexity",
  "Atomic settlement on Canton Global Synchronizer",
  "Enterprise infrastructure",
];

const cipInterfaces = [
  {
    name: "Holding",
    body: "Token custody and balance management.",
    icon: <Coins className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    name: "TransferFactory",
    body: "Initiate wallet-to-wallet transfers.",
    icon: <Send className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    name: "TransferInstruction",
    body: "Accept and execute incoming transfers.",
    icon: <Inbox className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    name: "AllocationFactory",
    body: "Allocate holdings for DvP settlement.",
    icon: <Layers className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    name: "MergeDelegation",
    body: "Consolidate fragmented holdings.",
    icon: <Combine className="h-5 w-5" strokeWidth={1.5} />,
  },
];

const useCases = [
  {
    title: "Fintech Platforms",
    body: "Add Canton-native digital asset wallets to your platform via API. No blockchain infrastructure required.",
    icon: <Briefcase className="h-6 w-6" strokeWidth={1.5} />,
  },
  {
    title: "Asset Managers",
    body: "Manage institutional digital asset holdings with full compliance, privacy, and audit trail.",
    icon: <Lock className="h-6 w-6" strokeWidth={1.5} />,
  },
  {
    title: "DeFi Protocols",
    body: "Integrate Cove as the wallet layer for your Canton DeFi application.",
    icon: <Network className="h-6 w-6" strokeWidth={1.5} />,
  },
  {
    title: "Exchanges",
    body: "Use Cove as settlement infrastructure for Canton-native token trading.",
    icon: <Building2 className="h-6 w-6" strokeWidth={1.5} />,
  },
];

export default function CovePage() {
  return (
    <>
      {/* HERO */}
      <HeroSection
        tone="teal"
        eyebrow="Product · Cove"
        title={
          <>
            Cove
            <br />
            <span className="bg-gradient-to-br from-brand-mint via-brand-teal to-brand-blue bg-clip-text text-transparent">
              Wallet API
            </span>
          </>
        }
        subtitle="Institutional-grade wallet infrastructure for Canton Network. CIP-56 compliant. Simple REST API."
        tagline="A safe harbour for institutional digital assets."
        actions={
          <>
            <Link href="/contact" className="btn-primary">
              Request Access
              <ArrowRight className="h-4 w-4" />
            </Link>
            <span
              className="btn-secondary cursor-not-allowed opacity-60"
              title="Coming Soon"
              aria-disabled
            >
              API Documentation
              <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
                Coming Soon
              </span>
            </span>
          </>
        }
      />

      {/* WHAT IS COVE */}
      <section className="relative py-24 md:py-32">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <div className="eyebrow mb-6">
                <span className="text-brand-teal/80">01</span>
                <span className="eyebrow-dot" aria-hidden />
                <span>What is Cove</span>
              </div>
              <h2 className="display-h2 text-balance">
                A clean HTTP API for Canton-native digital assets.
              </h2>
              <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-ink-muted">
                <p>
                  Cove is Qasara&apos;s Canton-native wallet API. It gives
                  institutions, fintech companies, and developers a clean HTTP
                  API to manage Canton-native digital asset holdings, initiate
                  transfers, accept incoming offers, and manage party
                  identities — without running their own Canton validator.
                </p>
                <p>
                  The name <em className="text-ink">Cove</em> represents what a
                  wallet should be: a safe harbour. A place where your assets
                  rest securely, protected from the open sea.
                </p>
              </div>
            </Reveal>

            <Reveal index={1} className="lg:col-span-5">
              <div className="glass-card p-8 md:p-9">
                <div className="eyebrow mb-6">
                  <span>Capabilities</span>
                </div>
                <ul className="space-y-4">
                  {tickList.map((item) => (
                    <li key={item} className="tick-item">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-teal/40 bg-brand-teal/10 text-brand-teal">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CIP-56 COMPLIANCE */}
      <section className="relative py-24 md:py-32 bg-bg-subtle/40">
        <div className="container-page">
          <SectionHeader
            index="02"
            eyebrow="CIP-56 Compliance"
            title="The standard for Canton token interoperability."
            description={
              <>
                CIP-56 is the Canton Network&apos;s standard for token
                interoperability. Any wallet that implements CIP-56 can hold
                and transfer any CIP-56 compliant token — the same way any
                browser can open any website, regardless of who built it.
                Cove implements the full CIP-56 interface stack.
              </>
            }
          />

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cipInterfaces.map((iface, i) => (
              <Reveal key={iface.name} index={i}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-bg-card/60 p-7 transition-all duration-500 hover:-translate-y-0.5 hover:border-brand-teal/40">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-teal/[0.05] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-bg-elevated text-brand-teal">
                        {iface.icon}
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
                        Interface
                      </span>
                    </div>
                    <h3 className="mt-7 text-xl font-semibold tracking-tight">
                      {iface.name}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">
                      {iface.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="relative py-24 md:py-32">
        <div className="container-page">
          <SectionHeader
            index="03"
            eyebrow="Use Cases"
            title="Built for the institutions building on Canton."
          />

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
            {useCases.map((uc, i) => (
              <Reveal key={uc.title} index={i}>
                <div className="group h-full bg-bg p-8 md:p-10 transition-colors hover:bg-bg-subtle">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-line bg-bg-elevated text-brand-teal transition-transform duration-500 group-hover:scale-105">
                    {uc.icon}
                  </div>
                  <h3 className="mt-8 text-xl font-semibold tracking-tight">
                    {uc.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                    {uc.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DOCS CALLOUT */}
      <section className="relative py-16 md:py-20">
        <div className="container-page">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-line bg-bg-card/60 p-8 md:p-12">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-blue/[0.06] via-transparent to-transparent" />
              <div className="relative grid items-center gap-8 md:grid-cols-12">
                <div className="md:col-span-8">
                  <div className="eyebrow mb-4">
                    <span>API Documentation</span>
                  </div>
                  <p className="text-balance text-lg leading-relaxed text-ink md:text-xl">
                    Full API documentation will be available at{" "}
                    <span className="font-mono text-brand-mint">
                      docs.qasara.ai
                    </span>
                    . We are onboarding design partners now to shape the API
                    surface.
                  </p>
                </div>
                <div className="md:col-span-4 md:text-right">
                  <Link href="/contact" className="btn-primary">
                    Become a Design Partner
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GET ACCESS */}
      <section className="relative py-24 md:py-32">
        <div className="container-page">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-line bg-bg-card/60 p-10 md:p-16">
              <div className="pointer-events-none absolute -top-32 -right-32 h-[24rem] w-[24rem] rounded-full bg-brand-teal/15 blur-[110px]" />
              <div className="pointer-events-none absolute -bottom-32 -left-32 h-[22rem] w-[22rem] rounded-full bg-brand-blue/10 blur-[100px]" />

              <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <div className="eyebrow mb-5">
                    <span className="eyebrow-dot" aria-hidden />
                    <span>Get Access</span>
                  </div>
                  <h2 className="display-h2 text-balance">
                    Cove is in private development.
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-ink-muted">
                    We are onboarding select institutional partners and
                    developers.
                  </p>
                </div>
                <Link href="/contact" className="btn-primary shrink-0">
                  Request Access
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

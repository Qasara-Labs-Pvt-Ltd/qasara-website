import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Code2,
  Coins,
  Network,
  Server,
  Wallet,
  Activity,
} from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Professional and managed services for institutions adopting Canton Network — from architecture and DAML development to validator operations and liquidity.",
};

type Service = {
  number: string;
  name: string;
  body: string;
  who: string;
  icon: React.ReactNode;
};

const professionalServices: Service[] = [
  {
    number: "01",
    name: "Canton Integration & Architecture",
    body: "Discovery, target-state architecture, technical roadmap, and integration plan covering identity, settlement, custody, and compliance.",
    who: "Banks, asset managers, fintechs starting their Canton journey.",
    icon: <Compass className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    number: "02",
    name: "DAML Application Development",
    body: "Build custom Canton applications — settlement systems, registries, workflow contracts, tokenisation platforms — designed and implemented to your specification.",
    who: "Institutions with a specific Canton-native product to ship.",
    icon: <Code2 className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    number: "03",
    name: "Tokenisation Advisory",
    body: "End-to-end support for issuing CIP-56 compliant tokens on Canton — bonds, equities, fund units, stablecoins. Legal coordination, token design, custody integration, and primary distribution.",
    who: "Issuers tokenising real-world assets on Canton.",
    icon: <Coins className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    number: "04",
    name: "DeFi Protocol Engineering",
    body: "Design and build institutional DeFi venues on Canton — AMMs, central limit order books, RFQ platforms, lending markets — with off-chain matching and atomic on-chain settlement.",
    who: "Trading venues, market infrastructure providers, DeFi protocols.",
    icon: <Network className="h-5 w-5" strokeWidth={1.5} />,
  },
];

const managedServices: Service[] = [
  {
    number: "05",
    name: "Validator-as-a-Service",
    body: "We operate a dedicated Canton Network validator on your behalf — provisioning, monitoring, upgrades, key management. You get the validator economics and ecosystem standing without the operational burden.",
    who: "Institutions that want their own validator presence without running the infrastructure.",
    icon: <Server className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    number: "06",
    name: "Managed Wallet Infrastructure",
    body: "Hosted Cove API deployments — wallet provisioning, custody integration, key management, monitoring. A turnkey wallet layer for institutions building on Canton.",
    who: "Fintech platforms and asset managers that need Canton wallets without standing up their own.",
    icon: <Wallet className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    number: "07",
    name: "Liquidity & Market Making",
    body: "Provide continuous quotes and liquidity on Canton-native trading venues. Operated by Qasara's quant team using its own market-making infrastructure.",
    who: "Canton venues needing liquidity, issuers wanting secondary market depth.",
    icon: <Activity className="h-5 w-5" strokeWidth={1.5} />,
  },
];

const whyQasara = [
  {
    title: "Canton-native",
    body: "Built on Canton from day one, not retrofitted from Ethereum.",
  },
  {
    title: "Institutional grade",
    body: "Designed for the procurement, compliance, and operational expectations of regulated institutions.",
  },
  {
    title: "Vertical depth",
    body: "We design protocols, build apps, and operate validators. Same team, full stack.",
  },
];

function ServiceCard({ s, i }: { s: Service; i: number }) {
  return (
    <Reveal index={i}>
      <div className="trace-border group relative h-full overflow-hidden rounded-2xl border border-line bg-bg-card/60 p-7 md:p-8 transition-all duration-500 hover:-translate-y-0.5 hover:border-brand-teal/40">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-teal/[0.05] via-transparent to-brand-blue/[0.05] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative">
          <div className="flex items-start justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand-teal/80">
              {s.number}
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-bg-elevated text-ink-muted transition-colors duration-500 group-hover:text-brand-teal">
              {s.icon}
            </div>
          </div>

          <h3 className="mt-7 text-xl font-semibold tracking-tight md:text-[22px]">
            {s.name}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
            {s.body}
          </p>

          <div className="mt-6 border-t border-line/70 pt-4">
            <p className="text-[13px] leading-relaxed text-ink-dim">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                Who it&apos;s for
              </span>
              <br />
              <span className="text-ink/85">{s.who}</span>
            </p>
          </div>

          <ArrowUpRight className="absolute right-0 top-0 h-4 w-4 translate-y-0 text-ink-dim opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
        </div>
      </div>
    </Reveal>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <HeroSection
        tone="default"
        eyebrow="Services · Canton Infrastructure"
        title={
          <>
            Build, deploy, and operate on Canton —
            <br />
            <span className="bg-gradient-to-br from-brand-mint via-brand-teal to-brand-blue bg-clip-text text-transparent">
              with Qasara.
            </span>
          </>
        }
        subtitle="Professional and managed services for institutions adopting Canton Network."
        tagline="From architecture to operations — we cover the full Canton stack."
        actions={
          <Link href="/contact" className="btn-primary">
            Discuss your project
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      {/* PROFESSIONAL SERVICES */}
      <section className="relative py-16 md:py-24">
        <div className="container-page">
          <SectionHeader
            index="01"
            eyebrow="Professional Services"
            title="Project-based engagements."
            description="Defined scope, defined deliverable. Engage Qasara to design, build, or validate a Canton-native system."
          />

          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {professionalServices.map((s, i) => (
              <ServiceCard key={s.number} s={s} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* MANAGED SERVICES */}
      <section className="relative py-16 md:py-24 bg-bg-subtle/40">
        <div className="container-page">
          <SectionHeader
            index="02"
            eyebrow="Managed Services"
            title="Ongoing operations."
            description="Hand Qasara the keys. We run the infrastructure so you can focus on your customers."
          />

          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {managedServices.map((s, i) => (
              <ServiceCard key={s.number} s={s} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY QASARA */}
      <section className="relative py-20 md:py-24">
        <div className="container-page">
          <div className="hairline" />
          <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
            {whyQasara.map((item, i) => (
              <Reveal key={item.title} index={i}>
                <div>
                  <div className="eyebrow mb-4">
                    <span className="eyebrow-dot" aria-hidden />
                    <span>0{i + 1}</span>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-16 md:py-24">
        <div className="container-page">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-line bg-bg-card/60 p-10 md:p-16">
              <div className="pointer-events-none absolute -top-32 -right-32 h-[24rem] w-[24rem] rounded-full bg-brand-teal/15 blur-[110px]" />
              <div className="pointer-events-none absolute -bottom-32 -left-32 h-[22rem] w-[22rem] rounded-full bg-brand-blue/10 blur-[100px]" />

              <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <div className="eyebrow mb-5">
                    <span className="eyebrow-dot" aria-hidden />
                    <span>Get in touch</span>
                  </div>
                  <h2 className="display-h2 text-balance">
                    Ready to build on Canton?
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-ink-muted">
                    Tell us about your project. We&apos;ll respond within one
                    business day.
                  </p>
                </div>
                <Link href="/contact" className="btn-primary shrink-0">
                  Get in touch
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

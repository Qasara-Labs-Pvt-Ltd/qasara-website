import Link from "next/link";
import { ArrowRight, ArrowUpRight, Lock, Zap, Building2, Wallet, Network, Server } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <HeroSection
        eyebrow="QASARA · Where Canton Flows"
        title={
          <>
            Building Canton&apos;s{" "}
            <span className="relative">
              <span className="bg-gradient-to-br from-brand-mint via-brand-teal to-brand-blue bg-clip-text text-transparent">
                Infrastructure
              </span>
            </span>{" "}
            Layer
          </>
        }
        subtitle="Qasara builds products for the institutional Canton Network era — a wallet API and a cross-chain bridge."
        actions={
          <>
            <Link href="/cove" className="btn-primary">
              Explore Cove API
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="btn-secondary">
              Get in Touch
            </Link>
          </>
        }
      >
        {/* Floating ticker strip */}
        <div className="relative mt-24">
          <div className="hairline" />
          <div className="flex flex-wrap items-center justify-between gap-x-12 gap-y-4 py-7 text-xs uppercase tracking-[0.22em] text-ink-dim">
            <span className="font-mono">Canton Network</span>
            <span className="font-mono">CIP-56</span>
            <span className="font-mono">Global Synchronizer</span>
            <span className="font-mono">Atomic Settlement</span>
            <span className="font-mono">Institutional Grade</span>
          </div>
          <div className="hairline" />
        </div>
      </HeroSection>

      {/* PRODUCTS */}
      <section className="relative py-24 md:py-32">
        <div className="container-page">
          <SectionHeader
            index="01"
            eyebrow="Products"
            title="Two products. One mission."
            description="Infrastructure that lets institutions and developers build on Canton without running their own validator."
          />

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <Reveal index={0}>
              <ProductCard
                index="Product 01"
                title="Cove Wallet API"
                description="Canton-native wallet infrastructure for institutions and developers. CIP-56 compliant. Simple REST API. No blockchain expertise required."
                href="/cove"
                cta="Learn More"
                badge={{ label: "In Build", tone: "teal" }}
                icon={<Wallet className="h-7 w-7" strokeWidth={1.5} />}
                accent="teal"
              />
            </Reveal>
            <Reveal index={1}>
              <ProductCard
                index="Product 02"
                title="Canton Bridge"
                description="Move assets between Ethereum and Canton Network. Atomic cross-chain settlement. No custodian risk."
                href="/bridge"
                cta="Learn More"
                badge={{ label: "In Build", tone: "amber" }}
                icon={<Network className="h-7 w-7" strokeWidth={1.5} />}
                accent="purple"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHY CANTON */}
      <section className="relative py-24 md:py-32">
        <div className="container-page">
          <SectionHeader
            index="02"
            eyebrow="Why Canton"
            title={<>Built for institutional finance, not retail speculation.</>}
            description="Canton is the only public blockchain designed around the actual needs of capital markets — privacy, atomic settlement, and regulatory compliance."
          />

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {[
              {
                icon: <Lock className="h-6 w-6" strokeWidth={1.5} />,
                title: "Privacy by Design",
                body: "Sub-transaction privacy. Only parties to a transaction see its details. No surveillance, no data leakage.",
              },
              {
                icon: <Zap className="h-6 w-6" strokeWidth={1.5} />,
                title: "Atomic Settlement",
                body: "Both legs of any trade settle simultaneously on-chain. No counterparty risk window. No T+1 delays.",
              },
              {
                icon: <Building2 className="h-6 w-6" strokeWidth={1.5} />,
                title: "Institutional Adoption",
                body: "JPMorgan, Societe Generale, Goldman Sachs, DTCC, Broadridge. The world's largest financial institutions have chosen Canton.",
              },
            ].map((feature, i) => (
              <Reveal key={feature.title} index={i}>
                <div className="group h-full bg-bg p-8 md:p-10 transition-colors duration-300 hover:bg-bg-subtle">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-line bg-bg-elevated text-brand-teal transition-transform duration-500 group-hover:scale-105">
                    {feature.icon}
                  </div>
                  <h3 className="mt-8 text-xl font-semibold tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                    {feature.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE (one line) */}
      <section className="relative py-16 md:py-20">
        <div className="container-page">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-line bg-bg-card/60 p-8 md:p-12">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-teal/[0.05] via-transparent to-transparent" />
              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-line bg-bg-elevated text-brand-teal">
                    <Server className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="eyebrow mb-3">
                      <span>Infrastructure</span>
                    </div>
                    <p className="text-balance text-lg leading-relaxed text-ink md:text-xl">
                      Qasara operates a Canton Network MainNet validator as the
                      foundation for all our products.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ECOSYSTEM (one line) */}
      <section className="relative py-8 md:py-12">
        <div className="container-page">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-line bg-bg-card/60 p-8 md:p-12">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-blue/[0.05] via-transparent to-transparent" />
              <div className="relative">
                <div className="eyebrow mb-3">
                  <span>Ecosystem</span>
                </div>
                <p className="max-w-3xl text-balance text-lg leading-relaxed text-ink md:text-xl">
                  Built on Canton Network — the institutional blockchain chosen
                  by the world&apos;s largest financial institutions.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-24 md:py-32">
        <div className="container-page">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-line bg-bg-card/60 p-10 md:p-16">
              {/* Subtle nebula */}
              <div className="pointer-events-none absolute -top-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-brand-teal/15 blur-[120px]" />
              <div className="pointer-events-none absolute -bottom-32 -left-32 h-[26rem] w-[26rem] rounded-full bg-brand-blue/10 blur-[120px]" />

              <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <div className="eyebrow mb-5">
                    <span className="eyebrow-dot" aria-hidden />
                    <span>Partnership</span>
                  </div>
                  <h2 className="display-h2 text-balance">
                    Ready to build on Canton? Partner with Qasara.
                  </h2>
                </div>
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

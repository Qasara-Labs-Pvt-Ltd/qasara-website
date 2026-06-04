# Services Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/services` page presenting Qasara's 7 institutional services (4 Professional + 3 Managed), wired into global nav and footer.

**Architecture:** Single static route under Next.js App Router. Page composes existing primitives (`HeroSection`, `SectionHeader`, `Reveal`, `glass-card`, `nebula`) rather than introducing new components. Service data lives as inline arrays in the page file (same pattern as `app/cove/page.tsx`). Two small edits to `Nav.tsx` and `Footer.tsx` add the link site-wide. No new dependencies.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind, lucide-react icons, framer-motion (already in deps).

**Spec:** `docs/superpowers/specs/2026-05-23-services-page-design.md`

---

## File Structure

| Action  | Path                                | Responsibility                                                        |
|---------|-------------------------------------|----------------------------------------------------------------------|
| Create  | `app/services/page.tsx`             | The /services route — hero, two service sections, why strip, CTA     |
| Modify  | `components/Nav.tsx`                | Insert `Services` link between Bridge and Contact in `links` array   |
| Modify  | `components/Footer.tsx`             | Insert `Services` link; rename column heading `Products` → `Explore` |

Service data (the 7 services + 3 "why Qasara" items) lives inline in `app/services/page.tsx` — kept local because they aren't reused. If a second consumer appears (e.g. footer sitemap, a `/about` page) extract to `lib/services.ts` then.

---

## Task 1: Add Services link to Nav

**Files:**
- Modify: `components/Nav.tsx:9-13`

- [ ] **Step 1: Insert Services link in the `links` array**

Replace the `links` constant:

```tsx
const links = [
  { href: "/cove", label: "Cove" },
  { href: "/bridge", label: "Bridge" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];
```

The single array drives both the desktop nav and the mobile overlay, so this one edit covers both surfaces.

- [ ] **Step 2: Verify by reading the file**

The array between lines 9 and 14 should now have 4 entries in this order: Cove, Bridge, Services, Contact. No other changes.

---

## Task 2: Add Services link to Footer + rename column heading

**Files:**
- Modify: `components/Footer.tsx:5-9, 33-36`

- [ ] **Step 1: Insert Services link in `internalLinks`**

Replace the `internalLinks` constant:

```tsx
const internalLinks = [
  { href: "/cove", label: "Cove" },
  { href: "/bridge", label: "Bridge" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];
```

- [ ] **Step 2: Rename the column heading from `Products` to `Explore`**

In the same file, replace this block (around line 33–36):

```tsx
<div className="md:col-span-3">
  <div className="eyebrow mb-5">
    <span>Products</span>
  </div>
```

with:

```tsx
<div className="md:col-span-3">
  <div className="eyebrow mb-5">
    <span>Explore</span>
  </div>
```

Only the literal `Products` → `Explore` changes.

---

## Task 3: Create the Services page

**Files:**
- Create: `app/services/page.tsx`

- [ ] **Step 1: Create the file with the full page**

```tsx
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
      <section className="relative py-24 md:py-32">
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
      <section className="relative py-24 md:py-32 bg-bg-subtle/40">
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
```

- [ ] **Step 2: Verify the file imports resolve**

The file uses these imports — all should already exist:
- `HeroSection`, `SectionHeader`, `Reveal` from `@/components/` ✓ (verified)
- Icons from `lucide-react` (Compass, Code2, Coins, Network, Server, Wallet, Activity, ArrowRight, ArrowUpRight) — all are standard lucide-react exports ✓

No new dependencies to install.

---

## Task 4: Run build to verify

**Files:** none

- [ ] **Step 1: Run the production build**

```powershell
cd C:\development\protradedesk\qasara-website
npm run build
```

Expected output highlights:
- `✓ Compiled successfully`
- `✓ Linting and checking validity of types`
- Route table includes `○ /services` with a small size around ~1 kB

Example expected route line:
```
├ ○ /services                            ~1 kB           ~130 kB
```

- [ ] **Step 2: Fix any TypeScript errors**

If TypeScript reports errors:
- Read the error message
- Adjust the offending file
- Re-run `npm run build`
- Iterate until clean

Common causes if errors appear: a missing import, an apostrophe in JSX text not escaped (use `&apos;`), or a `Reveal index` passed as a string instead of a number.

- [ ] **Step 3: Confirm the build is clean**

Final `npm run build` output must show all 5 routes prerendered with no warnings:
```
┌ ○ /
├ ○ /bridge
├ ○ /contact
├ ○ /cove
└ ○ /services
```

---

## Task 5: Smoke-test in dev server

**Files:** none

- [ ] **Step 1: Start the dev server**

```powershell
npm run dev
```

Expected: `Ready in ~2s` and `Local: http://localhost:3000`.

- [ ] **Step 2: Visit each surface and confirm**

In a browser:
- `http://localhost:3000` — home renders; nav now shows `Cove · Bridge · Services · Contact`
- `http://localhost:3000/services` — Services page renders; hero, both service groups (4 + 3 cards), Why Qasara strip, final CTA all visible
- Click `Discuss your project` and `Get in touch` — both navigate to `/contact`
- Open browser dev tools console — no errors or warnings
- Click `Services` in the nav from another page — navigates correctly and shows the page as active in nav (teal underline)
- Resize browser to ~390px width — service cards stack to single column; nav collapses to hamburger; hamburger menu shows Services link
- Footer — `Explore` column now lists `Cove · Bridge · Services · Contact`

- [ ] **Step 3: Stop the dev server**

Ctrl+C in the terminal.

---

## Task 6: Commit and push

**Files:** all of the above

- [ ] **Step 1: Stage the changes**

```powershell
git add app/services/page.tsx components/Nav.tsx components/Footer.tsx docs/superpowers/specs/2026-05-23-services-page-design.md docs/superpowers/plans/2026-05-23-services-page.md
```

- [ ] **Step 2: Verify staged contents**

```powershell
git status
```

Expected:
- `new file:   app/services/page.tsx`
- `modified:   components/Nav.tsx`
- `modified:   components/Footer.tsx`
- `new file:   docs/superpowers/specs/2026-05-23-services-page-design.md`
- `new file:   docs/superpowers/plans/2026-05-23-services-page.md`

- [ ] **Step 3: Commit**

```powershell
git commit -m "Add Services page with professional + managed service catalogue"
```

- [ ] **Step 4: Push**

```powershell
git push origin main
```

Vercel's GitHub webhook will pick up the push and auto-deploy. The new page will be live at `qasara.ai/services` within ~60s.

---

## Out of scope reminder

- No per-service detail pages — page-level CTA is the single conversion path
- No pricing
- No client logos / case studies
- No lead capture form on the page itself — all conversion routes through `/contact`

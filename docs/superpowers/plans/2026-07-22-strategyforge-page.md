# StrategyForge Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the `/strategyforge` page on qasara.ai with an early-access Formspree lead form, plus nav + home-page wiring (STRAT-87/88/89).

**Architecture:** One new App Router route (`app/strategyforge/page.tsx`, server component) composed from the site's existing primitives (`HeroSection`, `Reveal`, `SectionHeader`), with a page-local `SuccessBanner` client component (copy of the `/contact` pattern). Lead capture posts directly to the existing Formspree endpoint — no backend, no new dependencies.

**Tech Stack:** Next.js App Router, Tailwind, framer-motion (via existing components), lucide-react icons, Formspree.

**Spec:** `docs/superpowers/specs/2026-07-22-strategyforge-page-design.md` (read it before starting).

## Global Constraints

- **Working name is "StrategyForge"** — no other product names; NO references to Hummingbot or other ecosystems' tools.
- **Honesty constraint (binding):** hero claims market-making ONLY. Arbitrage appears solely in the Strategies section badged "Early access". No copy may imply GA/self-serve availability — CTAs are "Request early access".
- **Inclusive copy:** speak to "trading teams and individual traders" — never "firms"/"institutions" exclusively; no minimum-size framing.
- **Formspree endpoint `meedknag` reused** (same as `/contact`) with hidden fields exactly: `_subject` = `StrategyForge — early access request`, `product` = `strategyforge`, `_next` = `https://qasara.ai/strategyforge?success=true`.
- **No new dependencies. No analytics. No API routes.** Repo has no test suite — the gate is `npm run build` + `npm run lint` after every task.
- Git: identity `anand@qasara.ai` (repo-local, already set). Path-scoped commits (`git add <files>`), **no `Co-Authored-By` trailer**.
- Reuse existing idioms: `container-page`, `eyebrow`, `display-h2`, `btn-primary`, `pill pill-teal`, `.form-input` (page-local `<style>` block, same as `/contact`), `border-line bg-bg-card/60 rounded-2xl` card pattern.

---

## File Structure

- Create: `app/strategyforge/page.tsx` — the whole page (hero, how-it-works, strategies, venues, why, partner strip, FAQ, form, disclaimer, metadata). Matches the repo's one-file-per-product-page idiom (`/cove`, `/bridge`).
- Create: `app/strategyforge/SuccessBanner.tsx` — client component, `?success=true` banner.
- Modify: `components/Nav.tsx` — add the StrategyForge link.
- Modify: `app/page.tsx` — add the StrategyForge `ProductCard`.

---

### Task 1: `/strategyforge` page — static sections + metadata (no form yet)

**Files:**
- Create: `app/strategyforge/page.tsx`

**Interfaces:**
- Consumes: `HeroSection({eyebrow, title, subtitle, actions, tone})`, `Reveal({children, index?, className?})`, `SectionHeader({index?, eyebrow, title, description?, align?})` — all existing.
- Produces: the page shell with section anchors `#how-it-works` and `#early-access` (Task 2 fills `#early-access` with the form; it is created here as an empty section placeholder so the hero CTA link resolves).

- [ ] **Step 1: Create the page**

```tsx
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
```

- [ ] **Step 2: Build + lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, `/strategyforge` appears in the route list, lint clean. (If `btn-ghost` or `pill pill-amber` turn out not to exist in `globals.css`, check with `grep -n "btn-ghost\|pill-amber" app/globals.css` — both exist per pre-plan inspection; if one is missing, substitute `btn-secondary` / `pill pill-teal` and note it.)

- [ ] **Step 3: Manual smoke**

Run: `npm run dev` then `curl -s http://localhost:3000/strategyforge | grep -c "non-custodial"`
Expected: ≥ 1. Also eyeball http://localhost:3000/strategyforge in a browser: hero renders, both hero links jump to their anchors, all six sections present. Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add app/strategyforge/page.tsx
git commit -m "feat: /strategyforge page — hero, how-it-works, strategies, venues, why, partners, FAQ (STRAT-88 copy)"
```

---

### Task 2: Early-access form + SuccessBanner

**Files:**
- Create: `app/strategyforge/SuccessBanner.tsx`
- Modify: `app/strategyforge/page.tsx` (fill the `#early-access` section)

**Interfaces:**
- Consumes: the `#early-access` placeholder section from Task 1; Formspree endpoint `meedknag`.
- Produces: the complete lead form; no exports consumed elsewhere.

- [ ] **Step 1: Create the SuccessBanner**

```tsx
// app/strategyforge/SuccessBanner.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export function SuccessBanner() {
  const params = useSearchParams();
  if (params.get("success") !== "true") return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="mb-8 flex items-start gap-4 rounded-2xl border border-brand-teal/40 bg-brand-teal/10 px-5 py-4 text-sm text-brand-mint backdrop-blur-sm"
    >
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.75} />
      <div>
        <p className="font-medium text-ink">Request received.</p>
        <p className="mt-1 text-ink-muted">
          Thanks — we&apos;ll be in touch about early access.
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Fill the `#early-access` section in `page.tsx`**

Add imports at the top of `app/strategyforge/page.tsx`:

```tsx
import { Suspense } from "react";
import { Send } from "lucide-react";
import { SuccessBanner } from "./SuccessBanner";
```

Add module-level constants (next to the other data arrays):

```tsx
const FORMSPREE_ID = "meedknag"; // shared site endpoint — StrategyForge leads segmented by hidden fields
const roles = ["Market maker / LP", "Trader / Quant", "Venue / Exchange", "Institution / Fund", "Other"];
const interests = ["Market-making", "Arbitrage (early access)", "Just exploring"];
```

Replace the empty `<section id="early-access" …/>` with:

```tsx
      {/* EARLY ACCESS FORM */}
      <section id="early-access" className="relative pb-24 md:pb-32">
        <div className="container-page">
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl border border-line bg-bg-card/60 p-8 md:p-10">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-teal/[0.05] via-transparent to-transparent" />
                <Suspense fallback={null}>
                  <SuccessBanner />
                </Suspense>
                <div className="relative">
                  <div className="eyebrow mb-4">
                    <span>Early access</span>
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                    Request early access
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                    Tell us a little about how you trade and we&apos;ll be in touch.
                  </p>

                  <form
                    action={`https://formspree.io/f/${FORMSPREE_ID}`}
                    method="POST"
                    className="mt-8 flex flex-col gap-5"
                  >
                    <input
                      type="hidden"
                      name="_next"
                      value="https://qasara.ai/strategyforge?success=true"
                    />
                    <input
                      type="hidden"
                      name="_subject"
                      value="StrategyForge — early access request"
                    />
                    <input type="hidden" name="product" value="strategyforge" />

                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Name" required>
                        <input type="text" name="name" required autoComplete="name" className="form-input" />
                      </Field>
                      <Field label="Email" required>
                        <input type="email" name="email" required autoComplete="email" className="form-input" />
                      </Field>
                    </div>

                    <Field label="Company / team">
                      <input type="text" name="company" autoComplete="organization" className="form-input" />
                    </Field>

                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Role">
                        <select name="role" className="form-input appearance-none pr-10" defaultValue="">
                          <option value="" disabled>
                            Select…
                          </option>
                          {roles.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Interested in">
                        <select name="interested_in" className="form-input appearance-none pr-10" defaultValue="">
                          <option value="" disabled>
                            Select…
                          </option>
                          {interests.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <Field label="Anything else">
                      <textarea
                        name="message"
                        rows={4}
                        placeholder="Venues, pairs, or assets you care about — anything that helps us tailor the walkthrough."
                        className="form-input resize-y"
                      />
                    </Field>

                    <label className="flex items-center gap-3 text-sm text-ink-muted">
                      <input
                        type="checkbox"
                        name="demo_requested"
                        value="yes"
                        className="h-4 w-4 rounded border-line bg-bg-elevated accent-teal-600"
                      />
                      I&apos;d like a demo walkthrough
                    </label>

                    <div className="pt-2">
                      <button type="submit" className="btn-primary">
                        Request early access
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </form>

                  <p className="mt-8 text-xs leading-relaxed text-ink-dim">
                    StrategyForge is software tooling. Nothing on this page is financial
                    advice, and automated trading carries risk.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
```

Append at the bottom of the file (after the default export), the `Field` helper and the `.form-input` style block — same idiom as `app/contact/page.tsx`:

```tsx
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
        {label}
        {required && <span className="ml-1 text-brand-teal">*</span>}
      </span>
      {children}
    </label>
  );
}
```

And inside the returned JSX, just before the closing `</>` of the page component, the style block (verbatim from `/contact`):

```tsx
      <style>{`
        .form-input {
          width: 100%;
          background-color: #0D1220;
          border: 1px solid #1F2937;
          border-radius: 0.625rem;
          padding: 0.75rem 0.875rem;
          color: #F9FAFB;
          font-size: 0.95rem;
          line-height: 1.4;
          transition: border-color 200ms ease, box-shadow 200ms ease;
          outline: none;
        }
        .form-input::placeholder { color: #6B7280; }
        .form-input:focus {
          border-color: rgba(13, 148, 136, 0.6);
          box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.15);
        }
        select.form-input {
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'><path d='M1 1L6 6L11 1' stroke='%239CA3AF' stroke-width='1.5'/></svg>");
          background-repeat: no-repeat;
          background-position: right 1rem center;
        }
      `}</style>
```

- [ ] **Step 3: Build + verify the hidden fields render**

Run: `npm run build && npm run lint`
Expected: clean.

Run: `npm run dev` then:
```bash
curl -s http://localhost:3000/strategyforge | grep -o 'name="_subject" value="[^"]*"'
curl -s http://localhost:3000/strategyforge | grep -o 'name="product" value="strategyforge"'
curl -s "http://localhost:3000/strategyforge?success=true" | grep -c "Request received"
```
Expected: the `_subject` value `StrategyForge — early access request`; the `product` hidden input; `≥ 1` for the success banner. Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add app/strategyforge/page.tsx app/strategyforge/SuccessBanner.tsx
git commit -m "feat: /strategyforge early-access form — Formspree (shared endpoint, product-segmented) + success banner + disclaimer"
```

---

### Task 3: Site wiring — nav link + home ProductCard

**Files:**
- Modify: `components/Nav.tsx` (links array, ~line 10)
- Modify: `app/page.tsx` (products grid, after the Bridge card ~line 86)

**Interfaces:**
- Consumes: `ProductCard({index, title, description, href, cta, badge:{label,tone}, icon?, accent?})`; the Nav `links` array of `{href,label}`.

- [ ] **Step 1: Add the nav link**

In `components/Nav.tsx`, the links array becomes (StrategyForge before Contact):

```tsx
  { href: "/cove", label: "Cove" },
  { href: "/bridge", label: "Bridge" },
  { href: "/strategyforge", label: "StrategyForge" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
```

- [ ] **Step 2: Add the home-page ProductCard**

In `app/page.tsx`, add to the lucide-react import: `Bot` (alongside the existing icons). After the Canton Bridge `</Reveal>` block, add:

```tsx
            <Reveal index={2}>
              <ProductCard
                index="Product 03"
                title="StrategyForge"
                description="Non-custodial automated market-making on Canton venues. Your strategies, your accounts — your keys never leave your control."
                href="/strategyforge"
                cta="Request Early Access"
                badge={{ label: "Early Access", tone: "teal" }}
                icon={<Bot className="h-7 w-7" strokeWidth={1.5} />}
                accent="teal"
              />
            </Reveal>
```

(If the products grid is `md:grid-cols-2`, three cards wrap naturally — leave the grid class as-is unless it visibly breaks, in which case note it in the report rather than redesigning.)

- [ ] **Step 3: Build + smoke**

Run: `npm run build && npm run lint`
Expected: clean.

Run: `npm run dev`; check http://localhost:3000 shows the StrategyForge card linking to `/strategyforge`, and the nav shows StrategyForge on desktop + mobile menu. Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add components/Nav.tsx app/page.tsx
git commit -m "feat: wire StrategyForge into nav + home products grid"
```

---

## Final acceptance (against the spec §7)

- `npm run build` + `npm run lint` clean.
- All three commits present; no other files touched.
- Copy check: hero mentions market-making only; arbitrage badged "Early access"; no GA claims; no Hummingbot references; inclusive wording ("trading teams and individual traders").
- Form posts to `https://formspree.io/f/meedknag` with the three hidden fields; `?success=true` renders the banner.
- Live-deploy note for the operator (not part of this plan): after deploy, submit one real test lead and confirm it arrives in Formspree tagged `product=strategyforge`.

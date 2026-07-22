# StrategyForge Page on qasara.ai — Design

**Status:** approved for planning (brainstormed 2026-07-22; Fable review folded in)
**Jira:** STRAT-87 (epic) / STRAT-88 (copy) / STRAT-89 (build + lead capture)
**Route:** `/strategyforge` in this repo (Next.js App Router + Tailwind + framer-motion)

## 1. Goal & audience

Go-to-market surface for G1 demand validation: a public URL for partner outreach and an
**early-access / demo interest form** as the measurable lead funnel.

- **Primary audience (hero speaks to them):** professional market-makers / liquidity-provider
  firms, quant trading teams, **and crypto-native individual traders / small teams** entering
  Canton. Copy must stay inclusive of individuals — say "trading teams and individual
  traders", never "firms"/"institutions" exclusively; the non-custodial pitch lands hardest
  with self-directed traders who won't hand over keys.
- **Secondary:** Canton venues & ecosystem partners — addressed by a small partner strip that
  links to `/contact` (Partnership enquiry type), NOT by the main form.
- **Name:** ships under the working name **StrategyForge** (naming decision deliberately not
  blocked on; see STRAT-87). No references to Hummingbot or other ecosystems' tools —
  the page stands on its own positioning.

## 2. Positioning (copy direction — final wordsmithing is STRAT-88)

Two differentiators carry the page:

1. **Non-custodial by construction** — the signing sidecar runs on the customer's own
   infrastructure; keys never leave their control; StrategyForge never holds funds; users
   trade their **own** venue accounts.
2. **Canton-native automation** — market-making strategies running 24/7 on Canton venues
   (Temple CLOB, Tradecraft AMM) out of the box.

**Honesty constraint (binding):** the hero claims the **platform category**
("Automated trading strategies on Canton, non-custodial by design") — it must NOT name any
single not-yet-live strategy as available. Arbitrage appears only in the Strategies section,
explicitly badged **early access**; market-making (live) is the proven flagship shown first.
Nothing on the page may imply GA/self-serve availability — every CTA is "Request early
access" / demo framing. (Amended 2026-07-22: the hero was originally pinned to
"market-making only"; broadened to the strategy-platform category since the Strategies
section already differentiates live vs early-access, and the narrow hero undersold the
product. The guard is unchanged — no not-yet-live strategy named as GA in the hero.)

## 3. Page structure (top → bottom)

1. **Hero** — `HeroSection` (eyebrow "StrategyForge"). H1: automated market-making on
   Canton, non-custodial by design. Sub: run automated strategies on Canton venues; your
   keys never leave your control. Primary CTA button → scrolls/links to the form section
   (`#early-access`); secondary text link → "See how it works" (`#how-it-works`).
2. **How it works** (`#how-it-works`) — the non-custodial architecture in 3 steps
   (simple numbered cards or a light diagram, existing card idiom):
   (1) Your keys stay yours — the signing sidecar runs on your infra; StrategyForge never
   holds funds. (2) Strategies compute the orders (grid market-making; more coming).
   (3) Orders execute on **your own** venue accounts on Canton.
3. **Strategies** — cards: **Market-making (grid)**; **Cross-venue arbitrage** badged
   *early access*; "more strategies coming".
4. **Venues** — Temple (CLOB) · Tradecraft (AMM) · more coming.
5. **Why StrategyForge** — exactly the props NOT already covered by How-it-works (no
   repetition of non-custodial): **Canton-native** · **24/7 unattended operation** ·
   **your accounts, your control** (venue relationships stay the customer's).
6. **Partner strip** (small, secondary) — "Running a Canton venue and need liquidity?
   Let's talk." → links to `/contact` (Partnership). Does NOT share the StrategyForge form.
7. **Mini-FAQ** (3 items, `<details>` or simple stacked blocks):
   - *Does StrategyForge ever hold my funds?* No — non-custodial sidecar, keys client-side.
   - *Which venues are supported?* Temple (CLOB) and Tradecraft (AMM) today; more coming.
   - *Is it generally available?* Early access — request access below.
8. **Early-access form** (`#early-access`) — see §4.
9. Existing site footer, plus a one-line disclaimer near the form or footer:
   StrategyForge is software tooling; nothing on this page is financial advice.

## 4. Lead-capture form (the G1 funnel)

Reuses the existing **Formspree** pattern from `app/contact/page.tsx` — **same endpoint
`meedknag`** (no new Formspree setup). Segmentation via hidden fields; Formspree stores all
posted fields, so StrategyForge leads are filterable by subject/product in the same inbox.

Hidden fields:
- `_subject`: `StrategyForge — early access request`
- `product`: `strategyforge`
- `_next`: `https://qasara.ai/strategyforge?success=true`

Visible fields:

| Field | Type | Required |
|---|---|---|
| Name | text | yes |
| Email | email | yes |
| Company / team | text | no |
| Role | select: Market maker / LP · Trader / Quant · Venue / Exchange · Institution / Fund · Other | no |
| Interested in | select: Market-making · Arbitrage (early access) · Just exploring | no |
| Anything else | textarea — placeholder invites venues/pairs/assets they care about | no |
| I'd like a demo walkthrough | checkbox (`demo_requested`) | no |

Success state: reuse the `/contact` `SuccessBanner` pattern (`?success=true` query param,
`Suspense`-wrapped client component) with StrategyForge copy ("Thanks — we'll be in touch
about early access."). Form styling: the existing `.form-input` + `Field` idiom (copied or
extracted; extraction into a shared component is acceptable if trivial, not required).

**Metric:** Formspree submission count (filter `product=strategyforge`). **No analytics
package is added** (explicit decision 2026-07-22).

## 5. Site wiring

- **Nav** (`components/Nav.tsx`): add `{ href: "/strategyforge", label: "StrategyForge" }`
  to the links array (before Contact).
- **Home page**: add a StrategyForge `ProductCard` alongside Cove/Bridge
  (title / description / href per the existing card interface).
- **Metadata**: `export const metadata` — title "StrategyForge", description (non-custodial
  automated market-making on Canton), OpenGraph title/description. No custom OG image
  required (site default).

## 6. Constraints

- Follow existing components/idioms: `HeroSection`, `Reveal`, `SectionHeader`,
  `ProductCard`, dark theme, teal/mint accents, `btn-primary`, `container-page`.
- No new dependencies. No backend/API routes. No analytics.
- Static page (server component) except the Suspense success banner, matching `/contact`.
- Git identity for this repo: `anand@qasara.ai`.
- Copy tone: consistent with the existing site voice (spare, credible) and with the
  Temple/Cantex outreach language (one voice across outreach + web — STRAT-88 AC) — while
  staying welcoming to individual traders per §1 (no institutional gatekeeping language,
  e.g. no "for institutions", no minimum-size framing).

## 7. Testing / acceptance

- `next build` passes (repo has no test suite; build + lint are the gate).
- Manual: form posts to Formspree with the hidden fields present; `?success=true` renders
  the banner; nav + home card link correctly; page renders sanely at mobile widths.
- Content check against §2's honesty constraint (no GA claims, arb badged early access).
- STRAT-89 AC: page live, leads captured durably (Formspree), links resolve. The
  "analytics wired" AC line is explicitly amended to Formspree-count-only per the
  2026-07-22 decision.

# Qasara — Master Pricing Sheet

> **INTERNAL ONLY — DO NOT SHARE EXTERNALLY**
> This is the single source of truth for service pricing. All proposals, brochures, sales emails, and call quotes derive from this document. If a number is not in this sheet, you are improvising. Update this file before changing numbers anywhere else.

**Date:** 2026-06-08
**Status:** v1 — founding-customer pricing, effective 2026-Q2
**Positioning:** Competitive — anchored against in-house TCO and top-tier consultancy alternatives. Designed to win first 5–10 client engagements; planned 25–40% list increase in 12 months.
**Author:** Anand

---

## 1. Pricing principles

Five rules that govern every quote we issue.

| # | Principle | Why |
|---|-----------|-----|
| 1 | **Don't publish hard prices on qasara.ai** — "From $X" or "Contact us" only | Securitize, Wintermute, Figment-institutional all do this. Public numbers cap top-end on large deals. |
| 2 | **Quote ranges, not points** — every artifact shows a band | Allows 2x flex without renegotiation. Standard institutional pattern. |
| 3 | **Anchor at top of band, discount strategically** | Easier to discount than raise. Discount = closes deal *and* makes buyer feel they won. |
| 4 | **Bundle managed services for retention** — discount Professional + Managed combos | Discovery → Build → Operate is the natural funnel. Reward it. |
| 5 | **Performance share on liquidity / advisory; flat on infra** | MM clients expect carry. CTOs buying validators expect predictable opex. Match buyer muscle memory. |

---

## 2. Service pricing — Professional

### 2.1 Canton Integration & Architecture

**Pricing tiers:**

| Tier | Duration | Price | Deliverable |
|------|----------|-------|-------------|
| Discovery Sprint | 4 weeks | **$45,000** | Architecture brief + 1-page strategy doc + 90-min executive readout |
| Full Engagement | 8 weeks | **$95,000** | Discovery + target-state architecture + integration plan + executive readout |
| Strategic Partnership | 12 weeks | **$150,000+** | Above + on-call advisory through go-live |

**Structure:** Fixed-price deliverable. 50% on signing, 50% on delivery.

**TCO frame (use in sales):**
> A McKinsey/BCG-class blockchain engagement runs $300k–$500k for a generic strategy doc with no Canton specificity. A Canton-savvy boutique like Qasara delivers an implementable plan at a third of the cost — and we can actually build what we recommend.

**Anchor source:** Top-tier blockchain advisory $80k–$250k; Qasara's Canton specificity supports the lower end with premium positioning.

---

### 2.2 DAML Application Development

**Pricing tiers:**

| Tier | Scope | Duration | Price |
|------|-------|----------|-------|
| Small | Single contract / workflow | 8–12 weeks | **$100,000 – $200,000** |
| Medium | Multi-contract app, integrations | 12–20 weeks | **$200,000 – $400,000** |
| Large | Full platform (settlement system, tokenisation rails) | 20+ weeks | **$400,000 – $800,000** |

**T&M alternative:** $2,000/day blended rate ($250/hr). Reserve for undefined-scope work.

**Structure:** Milestone-based payments (typically 4–6 milestones). 25% on signing.

**TCO frame:**
> Hiring 2 DAML developers costs $400k+/year in salary alone, plus 6–9 months to find them (DAML is a rare skill). Qasara ships a production app in 12–20 weeks at a fraction.

**Anchor source:** Trail of Bits / OpenZeppelin charge $25k/eng-week ($5k/eng-day). Qasara's $250/hr blended undercuts elite rates while reflecting DAML talent scarcity.

---

### 2.3 Tokenisation Advisory

**Pricing structure:**

| Component | Price | Notes |
|-----------|-------|-------|
| Setup engagement | **$50,000 – $100,000** | Token design, CIP-56 contract spec, legal coordination, custody integration plan, distribution playbook |
| Ongoing retainer | **$3,000 – $8,000 / month** | Post-launch advisory, registrar coordination, secondary-market guidance |

**Issuance kicker (% of issuance size):** **Do not quote.** Kills deals. Removed from list.

**Structure:** Setup paid 50% on signing, 50% on delivery of issuance-ready artifacts. Retainer billed monthly in advance.

**TCO frame:**
> Stitching together a tokenisation stack yourself — issuance platform vendor selection + legal + custody integration + CIP-56 contract work — typically runs $300k–$500k in first-year coordination overhead. Qasara delivers the whole stack for $60k–$200k first year.

**Anchor source:** Securitize $50k–$100k setup; transfer agent $5k–$25k/yr.

---

### 2.4 DeFi Protocol Engineering

**Pricing tiers:**

| Tier | Scope | Duration | Price |
|------|-------|----------|-------|
| Build on Qasara stack | Customise clob-protocol / AMM templates | 3–4 months | **$250,000 – $500,000** |
| Custom venue | Greenfield design + build | 4–6 months | **$500,000 – $1,000,000** |
| Greenfield + ops handoff | Above + transition to managed services | 6+ months | **$1,000,000+** with managed-services pull-through |

**Structure:** Milestone-based, typically 6–10 milestones. 20% on signing.

**TCO frame:**
> A 3-person Canton engineering team building a CLOB or RFQ venue in-house costs $1–2M in salaries for the 6–12 months it takes — and you still own the operational liability afterwards. Qasara ships in 4–6 months using its existing protocol templates.

**Anchor source:** Elite Web3 engineering at $25k/eng-week × 16–60 weeks = $400k–$1.5M. Qasara prices 25–40% below using existing IP as leverage.

---

## 3. Service pricing — Managed

### 3.1 Validator-as-a-Service ⭐ *priority service — highest pricing power*

**Pricing structure:**

| Component | Price |
|-----------|-------|
| Setup (one-time) | **$2,500** |
| Standard tier | **$2,500 / month** — 99% SLA, business-hours support |
| Professional tier | **$4,500 / month** — 99.5% SLA, 24/5 support, dedicated infra |
| Enterprise tier | **$7,500 / month** — 99.9% SLA, 24/7 on-call, multi-region, dedicated AM |
| Commission on CC rewards | **8%** of CC traffic-based rewards (CIP-104) |
| Commission with annual prepay | **6%** |

**Annual prepay discount on operating fee:** 15% off.

**Structure:** Monthly invoicing or annual prepay (12-month commitment). 30-day notice to cancel.

**TCO frame:**
> Running your own Canton validator in-house costs roughly **$220k/year** — one DevOps hire (~$160k loaded) + AWS infra (~$30k) + Splice/Canton ops learning curve (~$30k of senior eng time). Qasara handles it for **$30k–$90k/year all-in.**
> **Savings: 60–86%. Time to live: 2 weeks instead of 3 months.**

**Anchor source:** No published Canton VaaS comp exists. ETH commission norms 5–10% (Chorus One 5%, Figment 10–30%); Splice/Canton complexity supports 1.5x premium.

---

### 3.2 Managed Wallet Infrastructure (hosted Cove)

**Pricing structure:**

| Component | Price |
|-----------|-------|
| Setup (one-time) | **$15,000 – $30,000** |
| Standard tier | **$2,000 / month** — single deployment, business hours, up to 10k parties |
| Professional tier | **$5,000 / month** — HA, 24/5, up to 100k parties, multi-asset |
| Enterprise tier | **$10,000 / month+** — multi-region HA, 24/7, unlimited parties, dedicated AM |
| Overage tx fee | **$0.05 – $0.20 / tx** above tier-included volume |

**Tier-included volumes (per month):**
- Standard: 100k tx
- Professional: 1M tx
- Enterprise: custom

**Structure:** Monthly invoicing. Setup paid on signing.

**TCO frame:**
> Building Canton wallet infrastructure in-house = 4–6 months of Canton-specialist engineering, roughly $300k–$500k, plus ongoing ops liability. Qasara provides a turnkey Cove deployment for $24k–$120k/year.
> **Day-1 productive vs. month-6 productive.**

**Anchor source:** Blockdaemon / Alchemy enterprise APIs $1k–$10k/mo. Cove is wallet-layer (higher value than commodity nodes), supports premium.

---

### 3.3 Liquidity & Market Making

**Pricing structure:**

| Component | Price |
|-----------|-------|
| Setup (one-time) | **$5,000** per venue |
| Monthly retainer | **$8,000 – $15,000 / month** per venue |
| Performance share | **20% of net P&L** OR **20% spread carry** (client's choice) |
| Alternative model | Loan + call: **5–8% of token supply** on loan, strike at 2x launch price |

**Structure:** Monthly retainer billed in advance. Performance share computed and paid quarterly.

**TCO frame:**
> Hiring a quant + building MM infrastructure = $500k upfront + $300k/year ops. Alternative: signing a generic crypto-native MM firm with zero Canton expertise. Qasara already operates its own MM stack (temple-trader v3) and knows Canton venue microstructure.
> **Same outcome, 70% lower cost, Canton-native team.**

**Anchor source:** Flowdesk / Caladan retainer: $4k–$7k/mo first venue + 20% carry. Qasara prices ~2x because Canton venues are illiquid and harder to make.

---

## 4. Tier bundles (use on brochure)

For brochures and sales conversations, package services into named tiers that map to buyer maturity. Quote bundles when prospect is exploring; quote individual services in formal proposals.

| Tier | Target buyer | Includes | Indicative ACV |
|------|--------------|----------|----------------|
| **Foundation** | First Canton step — fintechs, smaller asset managers | Discovery Sprint + Wallet Standard (12 months) | **$60,000 – $120,000** |
| **Growth** | Building a Canton-native product | DAML build (Medium) + Validator Professional (12 months) | **$300,000 – $500,000** |
| **Enterprise** | Tokenising at scale / launching a venue | Protocol Engineering + Validator Enterprise + Liquidity (12 months) | **$1,000,000 – $2,000,000** |

---

## 5. Public vs. private — what goes where

| Asset | Public on qasara.ai? | What to show |
|-------|----------------------|--------------|
| Services page | ✅ Already live | Service names + descriptions only, **no pricing** |
| Brochure PDF (one-pager, downloadable) | ✅ Gated by email | Tier names + indicative ACVs + "starting from $X" anchors |
| Proposal / SOW templates | ❌ Private | Full numbers, terms, milestones |
| Sales email + first call | ❌ Private | Engagement bands, not point prices |
| Master pricing sheet (this doc) | ❌ Internal | Everything above |

---

## 6. Discount policy

**Standard discounts (no approval needed):**
- Annual prepay on managed services: **15% off operating fees**
- Multi-service bundle (Professional + Managed signed together): **10% off Professional fixed fee**
- Foundation Canton ecosystem members (introduced via Foundation): **10% off any service**

**Discretionary discounts (founder approval required):**
- **Up to 15% additional off list** for strategic clients (named brand, case study rights, multi-year commitment)
- Beyond 15% off list: case-by-case, requires explicit founder sign-off in writing

**Founding customer language (use in every quote):**
> "These rates reflect our launch pricing. Founding customer pricing locked for 12 months from signing. List rates expected to increase 25–40% in 2027."

This justifies the discount without devaluing future work.

---

## 7. Strategic notes (read before quoting)

1. **You are anchored as "the affordable Canton specialist."** Once a client signs at these rates, they'll resist increases. Plan for it: every contract includes a **"founding-customer pricing locked for 12 months, market rate thereafter"** clause.

2. **Managed services margin is tight at these rates.** A $2,500/mo VaaS deal nets very little after AWS + ops time. The bet is that **commission income on CC rewards + Professional Services pull-through funds the operation**. Don't go below Standard tier for any managed offering.

3. **Discount caps matter.** If you start discounting freely, every deal becomes a negotiation. Hold the line at the standard-discount tier unless the deal is genuinely strategic.

4. **Track every quote** in a simple sheet — date, prospect, services, quoted price, outcome. Without data we can't tune pricing in 12 months.

---

## 8. Review cadence

- **Monthly:** Track quote-to-close ratio per service. If close rate >50% on any service, that's a signal to raise prices.
- **Quarterly:** Revisit anchors — has the competitive landscape changed?
- **Annual (2027-Q2):** Major price review. Target 25–40% list increase if positioning is established.

---

## 9. Source benchmarks (research provenance)

Pricing anchored to the 2026-06-08 market research summarised in `docs/bd/pricing/research-2026-06-08.md` (to be saved separately if/when needed). Key sources:

- Validator pricing: Chorus One (5% commission), Figment (10–30%), Allnodes, P2P.org, Cherry Servers infra costs
- DAML / smart contract dev: Trail of Bits, OpenZeppelin ($25k/eng-week), Perimattic, Web3.career salary data
- Tokenisation: Securitize fee schedule, Tokenize Startup comparison table
- Market making: Flowdesk, Caladan published rate structures
- Web3 advisory: ConsenSys, Trail of Bits, boutique blockchain consulting comps

# Services Page — Design Spec

**Date:** 2026-05-23
**Status:** Approved, ready for implementation
**Owner:** Qasara
**Repo:** qasara-website (Next.js 14, App Router, TypeScript, Tailwind)

---

## 1. Purpose

Add a new top-level page at `/services` that presents Qasara's institutional service offerings — both project-based professional services and ongoing managed services. The page targets the gap in the current site between "we build products" (Cove, Bridge) and "we operate infrastructure" — and gives institutional buyers a concrete menu of what they can hire Qasara to do today, while the product portfolio is still "In Build."

## 2. Audience

Institutional buyers — banks, asset managers, fintechs, exchanges, trading venues, token issuers. Decision-makers across CTO / Head of Engineering, Head of Trading, Head of Tokenisation, and procurement.

The tone matches the rest of the site: institutional, clean, direct. No hype. No "revolutionary." No emoji. The content rules from the original site brief apply unchanged (no Featured App claims, no validator names, no dates, no SLA numbers, no uptime stats, no headcount).

## 3. Page shape

Single page at `/services`, served as a static route by Next.js App Router (`app/services/page.tsx`). Same dark theme, atmosphere (nebula gradient, grid overlay, grain), and component vocabulary as the rest of the site.

### 3.1 Sections, top to bottom

| # | Section            | Purpose                                              |
|---|--------------------|------------------------------------------------------|
| 1 | Hero               | Headline, subtitle, framing line, single CTA         |
| 2 | Professional group | 4 service cards in a 2-column grid                   |
| 3 | Managed group      | 3 service cards in a 3-column grid                   |
| 4 | Why Qasara strip   | 3 short institutional-grade reasons                  |
| 5 | Final CTA          | Re-engage to Contact page                            |

### 3.2 Navigation

Add a new `Services` link in the global nav, positioned **between Bridge and Contact**. Order: `Cove · Bridge · Services · Contact`. Update both desktop nav and mobile overlay.

The "Get API Access" button on the right of the nav stays unchanged.

The footer's internal-links column gets the same addition: `Cove · Bridge · Services · Contact`. The column heading in the footer is currently `Products`; with Services added (which is not a product), rename it to `Explore` to stay semantically accurate.

## 4. Content

### 4.1 Hero

- **Eyebrow:** `[ SERVICES · CANTON INFRASTRUCTURE ]` (mono, teal, uppercase, letter-spaced)
- **Headline:** "Build, deploy, and operate on Canton — with Qasara."
- **Subtitle:** "Professional and managed services for institutions adopting Canton Network."
- **Framing line** (italic, dim ink): *"From architecture to operations — we cover the full Canton stack."*
- **CTA:** "Discuss your project" → `/contact` (primary button)
- **Background:** blue/teal nebula gradient (`nebula` class, default variant — same as Cove page, not the purple Bridge accent)

### 4.2 Professional Services section

- **Eyebrow:** `[ 01 · PROFESSIONAL SERVICES ]`
- **Section headline:** "Project-based engagements."
- **Section intro:** "Defined scope, defined deliverable. Engage Qasara to design, build, or validate a Canton-native system."
- **Layout:** 4 cards in a 2-column grid (1-column on mobile, breakpoint `md`).

#### Service cards

Each card has the same structure: number (mono, dim teal, top-left), icon (lucide-react, top-right), service name, description, "Who it's for" line, subtle bottom-right arrow that animates on hover. Use the existing `glass-card` + `trace-border` styles from `globals.css`.

| # | Name                              | Icon              | Description                                                                                                                                                              | Who it's for                                                       |
|---|-----------------------------------|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| 01 | Canton Integration & Architecture | `Compass`         | Discovery, target-state architecture, technical roadmap, and integration plan covering identity, settlement, custody, and compliance.                                    | Banks, asset managers, fintechs starting their Canton journey.     |
| 02 | DAML Application Development      | `Code2`           | Build custom Canton applications — settlement systems, registries, workflow contracts, tokenisation platforms — designed and implemented to your specification.          | Institutions with a specific Canton-native product to ship.        |
| 03 | Tokenisation Advisory             | `Coins`           | End-to-end support for issuing CIP-56 compliant tokens on Canton — bonds, equities, fund units, stablecoins. Legal coordination, token design, custody integration, and primary distribution. | Issuers tokenising real-world assets on Canton.                    |
| 04 | DeFi Protocol Engineering         | `Network`         | Design and build institutional DeFi venues on Canton — AMMs, central limit order books, RFQ platforms, lending markets — with off-chain matching and atomic on-chain settlement. | Trading venues, market infrastructure providers, DeFi protocols.   |

### 4.3 Managed Services section

- **Eyebrow:** `[ 02 · MANAGED SERVICES ]`
- **Section headline:** "Ongoing operations."
- **Section intro:** "Hand Qasara the keys. We run the infrastructure so you can focus on your customers."
- **Layout:** 3 cards in a 3-column grid (1-column on mobile, breakpoint `md`).

#### Service cards

Same card style as Professional. Numbers continue from 05.

| # | Name                          | Icon              | Description                                                                                                                                                              | Who it's for                                                              |
|---|-------------------------------|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| 05 | Validator-as-a-Service        | `Server`          | We operate a dedicated Canton Network validator on your behalf — provisioning, monitoring, upgrades, key management. You get the validator economics and ecosystem standing without the operational burden. | Institutions that want their own validator presence without running the infrastructure. |
| 06 | Managed Wallet Infrastructure | `Wallet`          | Hosted Cove API deployments — wallet provisioning, custody integration, key management, monitoring. A turnkey wallet layer for institutions building on Canton.          | Fintech platforms and asset managers that need Canton wallets without standing up their own. |
| 07 | Liquidity & Market Making     | `Activity`        | Provide continuous quotes and liquidity on Canton-native trading venues. Operated by Qasara's quant team using its own market-making infrastructure.                     | Canton venues needing liquidity, issuers wanting secondary market depth.  |

### 4.4 Why Qasara strip

Three-column row, simple inline layout — each item has a one-word heading and a single-sentence body. No icons, no cards (just a subtle hairline divider above the strip).

| Title              | Body                                                                                                          |
|--------------------|---------------------------------------------------------------------------------------------------------------|
| Canton-native      | Built on Canton from day one, not retrofitted from Ethereum.                                                  |
| Institutional grade| Designed for the procurement, compliance, and operational expectations of regulated institutions.             |
| Vertical depth     | We design protocols, build apps, and operate validators. Same team, full stack.                               |

### 4.5 Final CTA

Centred card, same style as the home page's CTA.

- **Headline:** "Ready to build on Canton?"
- **Body:** "Tell us about your project. We'll respond within one business day."
- **Button:** "Get in touch" → `/contact`

## 5. Visual & interaction details

- Reuse existing tokens, components, and CSS classes from `app/globals.css` and `components/`. No new global styles.
- Service cards use `glass-card` base + `trace-border` for the gradient stroke that fades in on hover (already defined).
- Card numbers `01`–`07` use the mono font, teal accent, top-left.
- Card icon sits top-right, dim ink colour, transitions to brand-teal on hover.
- A small `ArrowUpRight` icon sits bottom-right of each card; translates +2px on hover.
- Scroll-reveal: light Framer Motion `fade-up` on each section as it enters viewport, same as other pages.
- Fully responsive — single column at 390px, 2-col at `md`, full grid at `lg`. The 3-card Managed grid collapses to single column on mobile.
- Eyebrow numbers (`[ 01 · ... ]`, `[ 02 · ... ]`) match the style used on Cove/Bridge for visual consistency.

## 6. SEO

- **Title:** `Services · Qasara`
- **Description:** "Professional and managed services for institutions adopting Canton Network — from architecture and DAML development to validator operations and liquidity."
- **OpenGraph:** title + description above; reuse site OG image.

## 7. Files to create / modify

| Action | Path                                       | Purpose                                                       |
|--------|--------------------------------------------|---------------------------------------------------------------|
| Create | `app/services/page.tsx`                    | The Services page itself                                      |
| Modify | `components/Nav.tsx`                       | Add `Services` link between Bridge and Contact                |
| Modify | `components/Footer.tsx`                    | Add `Services` link in footer link group; rename column heading `Products` → `Explore` |

No new shared components are introduced. The service card layout is local to `app/services/page.tsx` — if it grows to multiple pages later, it can be extracted then.

## 8. Out of scope

- Per-service detail pages (e.g. `/services/validator-as-a-service`) — not built for v1. Each card is not a link; the page-level CTA covers conversion.
- Pricing — explicitly excluded. Services are quoted per engagement.
- Case studies / testimonials — would strengthen the page but Qasara has none publicly disclosable yet. Add later when available.
- Service-level filtering / sorting — not needed at 7 cards.
- Lead capture form on the services page itself — keep the single conversion path through `/contact`.

## 9. Content rules carried over

All content rules from the original site brief apply unchanged. In particular:

- No SLA numbers, uptime claims, or response-time guarantees beyond the existing "one business day" used on Contact.
- No mention of the Qasara validator's specific name, region, or version.
- No team names or headcount.
- No specific institution / client names (no "we've worked with X").
- No roadmap dates. Services are presented as available today — that is the implicit framing of the page.

## 10. Open questions / future work

None blocking implementation. Items to revisit after launch:

- Add a "Pricing model" subline on each card (e.g. "Fixed bid" / "T&M" / "Monthly retainer") once Qasara has a standard pricing approach.
- Consider per-service detail pages once any single service drives substantial inbound traffic.
- Add client logos / case studies as soon as any are publicly approved.
